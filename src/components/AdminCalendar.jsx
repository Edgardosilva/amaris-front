import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { list } from 'postcss';

const AdminCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("http://localhost:3000/appointments/getAllAppointments");
        if (!response.ok) throw new Error("Error en la respuesta del servidor");

        const data = await response.json();

        // Verificar que start es válido antes de asignarlo
        const formattedEvents = data
          .filter(event => event.start && !isNaN(new Date(event.start))) // Filtrar fechas inválidas
          .map(event => ({
            id: event.id,
            title: event.title,
            start: new Date(event.start), // Convertir a Date si es necesario
          }));

        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
      initialView="timeGridWeek"
      events={events}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
      }}
    />
  );
};

export default AdminCalendar;
