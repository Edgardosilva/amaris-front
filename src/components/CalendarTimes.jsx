import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarStyles.css';
import DropdownTime from './DropdownTime';
import { useEffect } from 'react';
import Loader from './Loader';

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


  const unavailableDates = ['2024-11-13', '2024-11-15', '2024-11-14'];



  
  const fetchAvailableTimes = async (selectedDate) => {
    setLoading(true);
    try {
    
      const formattedDate = selectedDate.toISOString().split("T")[0]; 
      const response = await fetch(`https://amaris-api-production.up.railway.app/appointments/available?selectedDate=${formattedDate}`);
      const data = await response.json();
      setAvailableTimes(data.availableTimes || []);
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
    const duration = formData.procedimiento.duration; 
    const start = new Date(`2024-12-26T${startTime}`);
    const range = [start.toTimeString().slice(0, 5)]; 

    for (let i = 15; i <= duration; i += 15) {
      const nextTime = new Date(start.getTime() + i * 60 * 1000);
      range.push(nextTime.toTimeString().slice(0, 5));
    }
    setStartTime(startTime);
    setIsTimeSelected(true);
    setSelectedRange(range);
  };
  
  const handleDayClick = (date) => {
 
    const localDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    setSelectedDate(localDate);
    setSelectedRange([]);
  
  };
  
  

  return (
    <div className="md:max-w-[1200px] flex p-6 md:p-12 gap-3 md:gap-6 flex-wrap md:flex-nowrap">
      <div className='md:w-1/2 bg-white h-[390px] '>
        <Calendar
          onChange={handleDayClick}
          value={selectedDate ? new Date(selectedDate) : null} 
          className="text-lg max-h-[390px]"
          tileDisabled={disableTile}
          minDate={new Date()} 
        />
      </div>
      <section className='flex flex-col md:w-1/2 text-center'>
        {loading ? <Loader /> :
          <div className=" bg-white">
            {selectedDate && (
              <div className=''>
                <div className="p-6 flex flex-wrap gap-3 overflow-y-auto h-[300px] md:h-[390px] justify-center">
                  {availableTimes.map((time, index) => {
                    const isInRange = selectedRange.includes(time);

                    return (
                      <div
                        key={index}
                        onClick={() => handleTimeClick(time)}
                        className={`w-20 hover:bg-green-100 cursor-pointer rounded-md text-center p-2 ${isInRange ? "bg-green-100" : "bg-gray-100"
                          }`}
                      >
                        {time}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        }
        <div>
          {
              isTimeSelected && (
                <button
                  onClick={btnContinue}
                  className=" mt-5 px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-[#52a2b2] rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                >
                  Continuar
                </button>
              )
            }
        </div>
      </section>
    </div>
  );
};

export default CalendarWithTimes;