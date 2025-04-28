import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { list } from 'postcss';

const AdminCalendar = () => {
  const [events, setEvents] = useState([]);

  const fixLocalDate = (dateString) => {
    if (!dateString) return null; // ⚡ evita error si es null/undefined
  
    const parts = dateString.split('T');
    if (parts.length !== 2) return null; // ⚡ evita error si no tiene T
  
    const [datePart, timePart] = parts;
    const [year, month, day] = datePart.split('-').map(Number);
    const [hours, minutes, seconds] = timePart.split(':').map(Number);
  
    return new Date(year, month - 1, day, hours, minutes, seconds);
  };
  
  
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("https://amaris-api-production.up.railway.app/appointments/getAllAppointments");
        if (!response.ok) throw new Error("Error en la respuesta del servidor");
  
        const data = await response.json();
        const formattedEvents = data
          .map(event => {
            const fixedDate = fixLocalDate(event.start);
            if (!fixedDate) return null;
  
            return {
              id: event.id,
              title: event.title,
              start: new Date(event.start.replace('Z', '')), 
              state: event.state
            };
          })
          .filter(event => event !== null);
  
        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
  
    fetchAppointments();
  }, []);
  

  return (
    <div className='h-screen'>
      <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventDidMount={function changecolor(info) {
            const dotContainer = info.el.getElementsByClassName('fc-list-event-graphic')[0];
            const dot = dotContainer?.querySelector('span'); 
            if (dot) {
              if (info.event.extendedProps.state === "Confirmada") {
                dot.style.borderColor = '#28a745'; 
              } else {
                dot.style.borderColor = '#007bff'; 
              }
              
            }
          }}
          height={650}
          headerToolbar={{
            left: 'prev,next today',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
          }}
        />
    </div>
  );
};

export default AdminCalendar;
