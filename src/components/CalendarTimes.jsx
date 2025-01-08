import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarStyles.css';
import DropdownTime from './DropdownTime';
import { useEffect } from 'react';

const procedures = {
  "Limpieza Facial Básica": 45,
  "Limpieza Facial Premium": 90,
  "Limpieza Facial Superpremium": 120,
  "Masaje (30 min)": 30,
  "Masaje (45 min)": 45,
  "Drenaje Linfático": 60,
  "Presoterapia": 60,
  "Lifting de Pestañas": 120,
  "Radiofrecuencia Facial": 45,
  "Entrenamiento Funcional": 60,
};

const CalendarWithTimes = ({ formData, setFormData, isFormData, setIsFormData }) => {
  const [nameProcedure, setNameProcedure] = useState('seleccionado');
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedRange, setSelectedRange] = useState([]);
  const [isTimeSelected, setIsTimeSelected] = useState(false);
  // const [avaibleBoxes, setAvaibleBoxes] = useState(['Cualquier box', 'Solo en gym']);

  const unavailableDates = ['2024-11-13', '2024-11-15', '2024-11-14']; // Fechas no disponibles

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setNameProcedure(formData.procedimiento.name);
    generateAvailableTimes();
  };

  
  const fetchAvailableTimes = async (selectedDate) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/appointments/available?selectedDate=${selectedDate}`);
      const data = await response.json();
      setAvailableTimes(data.availableTimes || []);
      console.log(data);
    } catch (error) {
      console.error("Error fetching available times:", error);
      setAvailableTimes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableTimes(selectedDate);
    }
  }, [selectedDate]);
  

  const disableTile = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = date.toISOString().split('T')[0];
      return unavailableDates.includes(formattedDate);
    }
    return false;
  };

  const btnContinue = () => {
    const formWithDateTime = { ...formData, fecha: selectedDate, hora: startTime };
    setFormData(formWithDateTime);
    setIsFormData(!isFormData);
  }

  const handleTimeClick = (startTime) => {
    const duration = formData.procedimiento.duration; // Duración en minutos
    const start = new Date(`2024-12-26T${startTime}`);
    const range = [start.toTimeString().slice(0, 5)]; // Incluir el tiempo inicial en formato HH:mm


    // Agregar intervalos de 15 minutos hasta cubrir la duración
    for (let i = 15; i <= duration; i += 15) {
      const nextTime = new Date(start.getTime() + i * 60 * 1000);
      range.push(nextTime.toTimeString().slice(0, 5));
    }
    setStartTime(startTime);
    setIsTimeSelected(true);
    setSelectedRange(range);
  };
  
  const handleDayClick = (date) => {
    setSelectedDate(date.toISOString().split("T")[0]); // Guardar solo la fecha sin la hora
    setSelectedRange([]); // Limpiar el rango al cambiar de día
  };
  

  return (
    <div className="flex p-12 flex-col">
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">{`Selecciona un horario para ${formData.procedimiento?.name || 'el procedimiento seleccionado'}`}</h2>
        <Calendar
          onChange={handleDayClick}
          value={selectedDate}
          className="rounded-md shadow-md"
          tileDisabled={disableTile}
        />
      </div>

      <div className="mt-10">
        {selectedDate && (
          <div>
            <h3 className='text-lg font-semibold text-gray-700 mb-4'>Horarios disponibles para: {new Date(selectedDate).toDateString()}</h3>
            <ul className="mt-4">
              {availableTimes.map((time, index) => {
                const isInRange = selectedRange.includes(time); // Verifica si el horario está en el rango

                return (
                  <li
                    key={index}
                    onClick={() => handleTimeClick(time)}
                    className={` hover:bg-green-100 cursor-pointer py-2 px-4 rounded-md mb-2 text-gray-700 ${isInRange ? "bg-green-100" : "bg-gray-100"
                      }`}
                  >
                    {time}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        {
          isTimeSelected && (
            <button
              onClick={btnContinue}
              className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-[#52a2b2] rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Continuar
            </button>
          )
        }
      </div>
    </div>
  );
};

export default CalendarWithTimes;