import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarStyles.css';
import DropdownTime from './DropdownTime';

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
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [highlightedSlots, setHighlightedSlots] = useState([]);
  const [isTimeSelected, setIsTimeSelected] = useState(false);
  // const [avaibleBoxes, setAvaibleBoxes] = useState(['Cualquier box', 'Solo en gym']);

  const unavailableDates = ['2024-11-13', '2024-11-15', '2024-11-14']; // Fechas no disponibles
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setNameProcedure(formData.procedimiento.name);
    generateAvailableTimes();
  };

  const disableTile = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = date.toISOString().split('T')[0];
      return unavailableDates.includes(formattedDate);
    }
    return false;
  };

  const btnContinue = () => {
    const opciones = { month: 'short', day: 'numeric', year: 'numeric' };
    const fechaFormateada = selectedDate.toLocaleDateString('en-US', opciones);
    const formWithDateTime = { ...formData, fecha: fechaFormateada, hora: startTime };
    setFormData(formWithDateTime);
    setIsFormData(!isFormData);
  }

  const generateAvailableTimes = () => {
    const times = [];
    let startTime = 9 * 60; // Inicio a las 9:00 AM en minutos
    const endTime = 18 * 60; // Final a las 6:00 PM en minutos
    const interval = 15; // Intervalos de 15 minutos
    while (startTime < endTime) {
      const hours = Math.floor(startTime / 60);
      const minutes = startTime % 60;
      const time = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
      times.push({ time, isAvailable: true });
      startTime += interval;
    }
    setAvailableTimes(times);
  };

  const handleAppointmentBooking = (selectedTime) => {
    // const selectedProcedureConcurrentSessions = formData.procedimiento.concurrentSessions;
    // if (selectedProcedureConcurrentSessions === 3) {
    //   console.log('sesiones simultaneas para este procedimiento = 3');
    // }
    const procedureDuration = procedures[formData.procedimiento.name]; 
    const startSlotInMinutes = timeToMinutes(selectedTime);
    const endSlotInMinutes = startSlotInMinutes + procedureDuration;
    const newHighlightedSlots = availableTimes
      .filter(slot => {
        const slotTimeInMinutes = timeToMinutes(slot.time);
        return (
          slotTimeInMinutes >= startSlotInMinutes && 
          slotTimeInMinutes < endSlotInMinutes + 15 
        );
      })
      .map(slot => slot.time);
    setHighlightedSlots(newHighlightedSlots);
    setIsTimeSelected(!isTimeSelected);
    setStartTime(selectedTime);
  };
  

  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes; // Convierte la hora a minutos
  };
  

  return (
    <div className="flex space-x-8 p-12">
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Selecciona una fecha:</h2>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          className="rounded-md shadow-md"
          tileDisabled={disableTile}
        />
      </div>

      <div className="w-64">
        {selectedDate && (
          <div>
            <h3 className="text-md font-medium text-gray-700 mb-4">
              Horarios disponibles para {nameProcedure} el {selectedDate.toDateString()}:
            </h3>
            <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
              {availableTimes.map((slot, index) => (
                <button
                  key={index}
                  onClick={() => handleAppointmentBooking(slot.time)}
                  className={`p-2 rounded-md ${highlightedSlots.includes(slot.time)
                    ? 'bg-green-400' // Color para los horarios resaltados
                    : 'bg-white hover:bg-green-100'
                  }`}
                  disabled={!slot.isAvailable}
                >
                  {slot.time}
                </button>
              ))}
            </div>
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