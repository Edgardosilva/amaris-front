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
        <div >
          <section className="flex  h-screen">
            <section className=" w-full mt-6">
              <h1 className=" text-2xl font-bold text-[#208ea4] mb-2">Citas Agendadas</h1>
              <div className="filter-container ">
                <form action="">
                  <label htmlFor="search-word">Buscar:</label>
                  <input
                    type="text"
                    id="search-word"
                    name="search-word"
                    placeholder="Buscar palabras"
                  />

                  <label htmlFor="patient">Paciente:</label>
                  <input
                    type="text"
                    id="patient"
                    name="patient"
                    placeholder="Nombre del paciente"
                  />

                  <label htmlFor="professional">Especialista:</label>
                  <input
                    type="text"
                    id="professional"
                    name="professional"
                    placeholder="Nombre del especialista"
                  />

                  <label htmlFor="date">Fecha:</label>
                  <input type="date" id="date" name="date" />

                  <button type="button" className="search-btn">
                    Buscar
                  </button>
                </form>
              </div>
              <table className="">
                <thead>
                  <tr>
                    <th>Procedimiento</th>
                    <th>Solicitante</th>
                    <th>Paciente</th>
                    <th>Hora</th>
                    <th>Fecha</th>
                    <th>Editar</th>
                    <th>Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  {userAppointments.length === 0 ? (
                    <tr>
                      <td colSpan="6">No tienes citas agendadas.</td>
                    </tr>
                  ) : (
                    userAppointments.map((appointment) => (
                      <tr key={appointment.id}>
                        <td>{appointment.procedimiento}</td>
                        <td>{appointment.solicitante}</td>
                        <td>{appointment.paciente}</td>
                        <td>{appointment.hora}</td>
                        <td>{transformarFecha(appointment.fecha)}</td>
                        <td>
                          <button className="edit-btn">Editar</button>
                        </td>
                        <td>
                          <button className="delete-btn">Eliminar</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </section>
          </section>
        </div>
      </Layout>
    </>
    
  )
};

export default Dashboard;
