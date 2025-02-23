import React from 'react';
import { procedures } from '../procedures'
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';

const DateResume = ({ formData, setFormData }) => {

  useEffect(() => {
    const getUserIdFromToken = () => {
      try {
        const token = sessionStorage.getItem('access_token');
        if (token) {
          const decoded = jwtDecode(token);
          setFormData({ ...formData, idUsuarioActual: decoded.id });
          console.log(decoded.id);
        }
      } catch (error) {
        console.error('Error al extraer el usuario_id:', error);
      }
    }
    getUserIdFromToken(); 
  }, []); 
  

  const transformarHora = (hora) => {
    const [hours, minutes] = hora.split(":").map(Number);
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`;
  };
  
  const calcularHoraTermino = (hora, duration) => {
    const [hours, minutes, seconds] = hora.split(":").map(Number);
    const initialTime = new Date();
    initialTime.setHours(hours, minutes, seconds);
    initialTime.setMinutes(initialTime.getMinutes() + duration);
    return initialTime.toTimeString().split(" ")[0]; // Formato HH:mm:ss
  };

  const transformarFecha = (fecha) => {
    const date = new Date(fecha); // Convertir la fecha al objeto Date
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Meses son 0-indexados
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`; // Formato YYYY-MM-DD
  };
  
    const horaTransformada = transformarHora(formData.hora);
    const horaTermino = calcularHoraTermino(horaTransformada, formData.procedimiento.duration);
    const fechaTransformada = transformarFecha(formData.fecha);

    const agendarCita = async (e) => {
      try {
          e.preventDefault();
          const response = await fetch("http://localhost:3000/appointments", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  "usuarioId": formData.idUsuarioActual,
                  "procedimiento_id": formData.procedimiento.id,
                  "fecha": fechaTransformada,
                  "hora": horaTransformada,
                  "horaTermino": horaTermino,
                  "paciente_atendido": `${formData.nombre} ${formData.apellido}`,
                  "duracion": formData.procedimiento.duration,
                  "box": procedures[formData.procedimiento.id - 1].box,
                  "concurrentSessions": procedures[formData.procedimiento.id - 1].concurrentSessions,
                  "estado": "Pendiente"
              }),
          });
  
          const data = await response.json();
  
          if (response.ok) {
              // 🔹 Muestra una alerta de éxito y espera antes de continuar
              await Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Cita agendada correctamente!",
                  showConfirmButton: false,
                  timer: 2000
              });
  
              console.log("Cita agendada:", data);
              // Aquí puedes redirigir o limpiar el formulario si es necesario
          } else {
              // 🔹 Muestra una alerta de error con la respuesta del servidor
              Swal.fire({
                  icon: "error",
                  title: "Error al agendar cita",
                  text: data.message || "Hubo un problema al procesar la solicitud.",
              });
          }
      } catch (error) {
          console.log("Error:", error);
          // 🔹 Muestra una alerta si ocurre un error inesperado
          Swal.fire({
              icon: "error",
              title: "Error de conexión",
              text: "No se pudo conectar con el servidor. Intenta nuevamente.",
          });
      }
  };
  

  // const showData = (e) => {
  //   e.preventDefault();
  //   const data = {
  //     "idProcedimiento": formData.procedimiento.id,
  //     "Procedimiento": formData.procedimiento.name,
  //     "Duración": `${formData.procedimiento.duration} minutos`,
  //     "Box de atención": "Box 1",
  //     "Fecha": formData.fecha,
  //     "Hora": `${formData.hora} hrs`,
  //     "Nombre del paciente": `${formData.nombre} ${formData.apellido}`,
  //     "Correo electrónico": formData.correo,
  //   };
  //   console.log(data);
  // };

  // "usuarioId": 1,
  // "procedimiento_id": 10,
  // "fecha": "2024-11-19",
  // "hora": "11:00:00",
  // "horaTermino": "11:30:00",
  // "duracion": 30,
  // "box": "Solo en gym",
  // "concurrentSessions": 1,
  // "estado": "Pendiente"
  

  return (
    <form className="p-4 m-10 bg-white rounded-md shadow-md" onSubmit={agendarCita}>
      <div className="px-4 sm:px-0">
        <h3 className="font-bold text-3xl text-[#a6d230]">Resumen de su cita</h3>
        <p className="text-md font-semibold text-[#52a2b2]">Por favor verifique sus datos antes de continuar</p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <label className="text-sm/6 font-medium text-gray-900">Procedimiento</label>
            <input
              className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"
              type="text"
              value={formData.procedimiento.name}
              readOnly
            />
          </div>
          <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <label className="text-sm/6 font-medium text-gray-900">Duración</label>
            <input
              className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"
              type="text"
              value={`${formData.procedimiento.duration} minutos`}
              readOnly
            />
          </div>
          <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <label className="text-sm/6 font-medium text-gray-900">Fecha</label>
            <input
              className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"
              type="text"
              value={fechaTransformada}
              readOnly
            />
          </div>
          <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <label className="text-sm/6 font-medium text-gray-900">Hora</label>
            <input
              className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"
              type="text"
              value={`${horaTransformada} hrs`}
              readOnly
            />
          </div>
          <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <label className="text-sm/6 font-medium text-gray-900">Hora Término</label>
            <input
              className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"
              type="text"
              value={`${horaTermino} hrs`}
              readOnly
            />
          </div>
          <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <label className="text-sm/6 font-medium text-gray-900">Nombre del paciente</label>
            <input
              className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"
              type="text"
              value={`${formData.nombre} ${formData.apellido}`}
              readOnly
            />
          </div>
          <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <label className="text-sm/6 font-medium text-gray-900">Correo electrónico</label>
            <input
              className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"
              type="text"
              value={formData.correo}
              readOnly
            />
          </div>
          <button
            className="mt-8 px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-[#52a2b2] rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            type="submit"
          >
            Agendar
          </button>
        </dl>
      </div>
    </form>
  );
};

export default DateResume;