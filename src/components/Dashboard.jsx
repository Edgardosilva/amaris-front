import React, { useEffect, useState } from "react";
import "../components/Dashboard.css";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
import Swal from "sweetalert2";

const Dashboard = () => {

  const [userAppointments, setUserAppointments] = useState([]);
  const [filterCountry, setFilterCountry] = useState(null)


  const transformarFecha = (fecha) => {
    const date = new Date(fecha); 
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); 
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`; 
  };

  useEffect(() => {
    fetchAppointments();
  },[])

  const fetchAppointments = async () => {
    try {
      const response = await fetch('https://amaris-api-production.up.railway.app/appointments/getUserAppointments', {
        method: 'GET',
        credentials: 'include', // 👈 habilita el envío de cookies
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch appointments');
      }
  
      const data = await response.json();
      setUserAppointments(data.appointments);
    } catch (error) {
      console.error('Error fetching appointments:', error.message);
    }
};

const handleDeleteEvent = async (appointment) => {
  try {
 
    const citaDate = transformarFecha(appointment.fecha); 
    const now = new Date();
    const diffInMs = citaDate - now;
    const diffInHours = diffInMs / (1000 * 60 * 60);

    if (diffInHours < 24) {
      Swal.fire({
        icon: "warning",
        title: "No se puede eliminar",
        text: `Esta cita es para el ${transformarFecha(appointment.fecha)} y debe eliminarse con al menos 24 horas de anticipación.`,
      });
      return;
    }

    const result = await Swal.fire({
      title: "¿Cancelar cita?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cencalar",
    });

    if (!result.isConfirmed) return;

    const response = await fetch("https://amaris-api-production.up.railway.app/appointments/deleteAppointments", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: appointment.id }),
    });

    const data = await response.json();

    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "Cita cancelada",
        text: "La cita fue cancelada correctamente.",
      });

      setUserAppointments((prev) => prev.filter((appt) => appt.id !== appointment.id));
    } else {
      Swal.fire({
        icon: "error",
        title: "Error al cancelar",
        text: data.message || "Hubo un problema al cancelar la cita.",
      });
    }
  } catch (error) {
    console.error("Error:", error.message);
    Swal.fire({
      icon: "error",
      title: "Error de conexión",
      text: "No se pudo conectar con el servidor. Intenta nuevamente.",
    });
  }
};


const filterAppointments = filterCountry
? userAppointments.filter((row => {
  return row.paciente.toLowerCase().includes(filterCountry.toLowerCase())
}))
: userAppointments


  return (
    <>
      <Layout>
        <div className="flex justify-center p-4 h-screen">
          <section className="w-full max-w-[360px] md:max-w-2xl lg:max-w-4xl p-4 rounded-lg">
            <h1 className="text-lg md:text-2xl font-bold text-[#208ea4] mb-4 text-center">
              Citas Agendadas
            </h1>

            <div className="filter-container mb-4">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                  <label htmlFor="patient" className="block text-sm font-semibold">Paciente:</label>
                  <input type="text" id="patient" name="patient" placeholder="Nombre del paciente"
                    className="w-full p-2 border rounded-md" onChange={(e) => {
                      setFilterCountry(e.target.value)
                    }} 
                  />
                </div>

                <div>
                  <label htmlFor="professional" className="block text-sm font-semibold">Especialista:</label>
                  <input type="text" id="professional" name="professional" placeholder="Nombre del especialista"
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                <div className="md:col-span-2 flex justify-center">
                  <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                    Buscar
                  </button>
                </div>
              </form>
            </div>

            <div className="overflow-x-auto h-[600px] overflow-scroll ">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200 text-sm md:text-base">
                    <th className="p-2 border">Procedimiento</th>
                    <th className="p-2 border">Solicitante</th>
                    <th className="p-2 border">Paciente</th>
                    <th className="p-2 border">Hora</th>
                    <th className="p-2 border">Fecha</th>
                    <th className="p-2 border">Estado</th>
                    <th className="p-2 border">Cancelación</th>
                  </tr>
                </thead>
                <tbody>
                  {filterAppointments.length > 0 ? (
                    filterAppointments.map((appointment) => (
                      <tr key={appointment.id} className="text-sm md:text-base border">
                        <td className="p-2 border">{appointment.procedimiento}</td>
                        <td className="p-2 border">{appointment.solicitante}</td>
                        <td className="p-2 border">{appointment.paciente}</td>
                        <td className="p-2 border">{appointment.hora.slice(0, 5)}</td>
                        <td className="p-2 border min-w-32">{transformarFecha(appointment.fecha)}</td>
                        <td className={`ml-2 px-2 py-1 text-xs rounded-md ${appointment.estado === 'Confirmada'? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{appointment.estado}</td>
                        <td className="p-2 border">
                          <button onClick={() => handleDeleteEvent(appointment)} className="text-sm bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
                            Cancelar
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr key="no-data">
                      <td colSpan="7" className="p-4 text-center text-gray-500">
                        No tienes citas agendadas.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>

      </Layout>
    </>
    
  )
};

export default Dashboard;
