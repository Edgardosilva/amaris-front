import React, { useEffect, useState } from "react";
import "../components/Dashboard.css";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";

const Dashboard = () => {

  const [userAppointments, setUserAppointments] = useState([]);

  const transformarFecha = (fecha) => {
    const date = new Date(fecha); // Convertir la fecha al objeto Date
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Meses son 0-indexados
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`; // Formato YYYY-MM-DD
  };

  useEffect(() => {
    fetchAppointments();
  },[])

  const fetchAppointments = async () => {
    try {
        const token = sessionStorage.getItem('access_token');
        if (!token) {
            console.error('No token found');
            return;
        }
        const response = await fetch('http://localhost:3000/appointments/getUserAppointments', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch appointments');
        }
        const data = await response.json();
        console.log('Citas:', data.appointments);
        setUserAppointments(data.appointments); 
    } catch (error) {
        console.error('Error fetching appointments:', error.message);
    }
};


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
                  <label htmlFor="search-word" className="block text-sm font-semibold">Buscar:</label>
                  <input type="text" id="search-word" name="search-word" placeholder="Buscar palabras"
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                <div>
                  <label htmlFor="patient" className="block text-sm font-semibold">Paciente:</label>
                  <input type="text" id="patient" name="patient" placeholder="Nombre del paciente"
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                <div>
                  <label htmlFor="professional" className="block text-sm font-semibold">Especialista:</label>
                  <input type="text" id="professional" name="professional" placeholder="Nombre del especialista"
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                <div>
                  <label htmlFor="date" className="block text-sm font-semibold">Fecha:</label>
                  <input type="date" id="date" name="date" className="w-full p-2 border rounded-md" />
                </div>

                <div className="md:col-span-2 flex justify-center">
                  <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                    Buscar
                  </button>
                </div>
              </form>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200 text-sm md:text-base">
                    <th className="p-2 border">Procedimiento</th>
                    <th className="p-2 border">Solicitante</th>
                    <th className="p-2 border">Paciente</th>
                    <th className="p-2 border">Hora</th>
                    <th className="p-2 border">Fecha</th>
                    <th className="p-2 border">Editar</th>
                    <th className="p-2 border">Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  {userAppointments.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="p-4 text-center text-gray-500">No tienes citas agendadas.</td>
                    </tr>
                  ) : (
                    userAppointments.map((appointment) => (
                      <tr key={appointment.id} className="text-sm md:text-base border">
                        <td className="p-2 border">{appointment.procedimiento}</td>
                        <td className="p-2 border">{appointment.solicitante}</td>
                        <td className="p-2 border">{appointment.paciente}</td>
                        <td className="p-2 border">{appointment.hora}</td>
                        <td className="p-2 border">{transformarFecha(appointment.fecha)}</td>
                        <td className="p-2 border">
                          <button className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600">
                            Editar
                          </button>
                        </td>
                        <td className="p-2 border">
                          <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))
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
