import React from 'react';
import { procedures } from '../procedures'
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';

const DateResume = ({ formData, setFormData }) => {


  useEffect(() => {
    const getUserFromCookie = async () => {
      try {
        const response = await fetch('http://localhost:3000/login/auth/me', {
          credentials: 'include'
        });
        const data = await response.json();
        if (data.authenticated && data.user?.id) {
          setFormData(prevFormData => ({
            ...prevFormData,
            idUsuarioActual: data.user.id
          }));
          userDataResume.current = formData
        } else {
          console.warn('No se pudo obtener el usuario');
        }
      } catch (error) {
        console.error('Error al obtener el usuario desde el backend:', error);
      }
    };
    getUserFromCookie();
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
    return initialTime.toTimeString().split(" ")[0]; 
  };

  const transformarFecha = (fecha) => {
    const date = new Date(fecha); 
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); 
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`; 
  };
  
    const horaTransformada = transformarHora(formData.hora);
    const horaTermino = calcularHoraTermino(horaTransformada, formData.procedimiento.duration);
    const fechaTransformada = transformarFecha(formData.fecha);


    const agendarCita = async (e) => {
      e.preventDefault();
      try {
  
        const authResponse = await fetch("http://localhost:3000/login/auth/me", {
          method: "GET",
          credentials: "include",
        });
    
        const authData = await authResponse.json();
    
        if (!authData.authenticated) {
          Swal.fire({
            icon: "error",
            title: "Sesión expirada",
            text: "Por favor inicia sesión nuevamente.",
          });
          return;
        }
    
        const usuarioId = authData.user.id;
    
        const result = await Swal.fire({
          title: "¿Quieres agendar ahora?",
          text: "Se te enviará un correo de confirmación",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí, agendar!",
        });
    
        if (!result.isConfirmed) return;
    
        const response = await fetch("http://localhost:3000/appointments", {
          method: "POST",
          credentials: "include", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            usuarioId: usuarioId,
            procedimiento_id: formData.procedimiento.id,
            fecha: fechaTransformada,
            hora: horaTransformada,
            horaTermino: horaTermino,
            paciente_atendido: `${formData.nombre} ${formData.apellido}`,
            duracion: formData.procedimiento.duration,
            box: procedures[formData.procedimiento.id - 1].box,
            concurrentSessions: procedures[formData.procedimiento.id - 1].concurrentSessions,
            estado: "Pendiente",
          }),
        });
    
        const data = await response.json();
    
        if (response.ok) {
          Swal.fire({
            position: "center",
            title: "¡Cita agendada!",
            text: "Revisa tu correo para confirmarla.",
            icon: "success",
          });

        } else {
          Swal.fire({
            icon: "error",
            title: "Error al agendar la cita",
            text: data.message || "Hubo un problema al procesar la solicitud.",
          });
        }
      } catch (error) {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Error de conexión",
          text: "No se pudo conectar con el servidor. Intenta nuevamente.",
        });
      }
    };
    
  
  return (
    <form className=" p-4 m-5 md:m-10 bg-white rounded-md shadow-md flex flex-col justify-center" onSubmit={agendarCita}>
      <div className="px-4 py-2">
        <h3 className="font-bold text-2xl md:text-3xl text-[#a6d230] ">Resumen de su cita</h3>
        <p className="text-sm md:text-md font-semibold text-[#52a2b2]">Por favor verifique sus datos antes de continuar</p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100 flex flex-col gap-2">
          <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 flex flex-col">
            <label className="text-sm/6 font-medium text-gray-900">Procedimiento</label>
            <input
              className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"
              type="text"
              value={formData.procedimiento.name}
              readOnly
            />
          </div>
          <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 flex flex-col">
            <label className="text-sm/6 font-medium text-gray-900">Duración</label>
            <input
              className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"
              type="text"
              value={`${formData.procedimiento.duration} minutos`}
              readOnly
            />
          </div>
          <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 flex flex-col">
            <label className="text-sm/6 font-medium text-gray-900">Fecha</label>
            <input
              className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"
              type="text"
              value={fechaTransformada}
              readOnly
            />
          </div>
          <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 flex flex-col">
            <label className="text-sm/6 font-medium text-gray-900">Hora</label>
            <input
              className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"
              type="text"
              value={`${horaTransformada} hrs`}
              readOnly
            />
          </div>
          <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 flex flex-col">
            <label className="text-sm/6 font-medium text-gray-900">Hora Término</label>
            <input
              className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"
              type="text"
              value={`${horaTermino} hrs`}
              readOnly
            />
          </div>
          <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 flex flex-col">
            <label className="text-sm/6 font-medium text-gray-900">Nombre del paciente</label>
            <input
              className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"
              type="text"
              value={`${formData.nombre} ${formData.apellido}`}
              readOnly
            />
          </div>
          <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 flex flex-col">
            <label className="text-sm/6 font-medium text-gray-900">Correo electrónico</label>
            <input
              className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"
              type="text"
              value={formData.correo}
              readOnly
            />
          </div>
          <button
            className=" mt-5 md:mt-8 px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-[#52a2b2] rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
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