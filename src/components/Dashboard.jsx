import React from "react";
import "../components/Dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem('access_token');
    navigate('/login');
  }

  return <div>
    <nav className="bg-[#1C1C1C] text-white">
        <ul className="flex justify-between p-2">
          <li className='text-xl font-serif pl-5'>AMARISWEB</li>
          <li>NUEVA CITA</li>
          <button onClick={logout} className="border border-white" >SALIR</button>
        </ul>
      </nav>
      <section className="flex  h-screen">
        <section className=" w-1/6 bg-[#1C1C1C]">
          <ul className="text-white text-xl p-5 cursor-pointer">
            <li className="p-2 hover:bg-gray-700">Citas</li>
            <li className="p-2 hover:bg-gray-700">Pacientes</li>
            <li className="p-2 hover:bg-gray-700">Profesionales</li>
            <li className="p-2 hover:bg-gray-700">Usuarios</li>
            <li className="p-2 hover:bg-gray-700">Configuración</li>
            <li className="p-2 hover:bg-gray-700">Cerrar Sesión</li>
          </ul>
        </section>
        <section className=" w-5/6 p-10">
          <h1 className=" text-3xl font-bold">CITAS</h1>
          <div className="filter-container">
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
          <table>
            <thead>
              <tr>
                <th>Procedimiento</th>
                <th>Paciente</th>
                <th>Profesional</th>
                <th>Fecha</th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tratamiento Reductivo</td>
                <td>Juan Pérez</td>
                <td>Dra. María López</td>
                <td>2024-07-20</td>
                <td>
                  <button className="edit-btn">Editar</button>
                </td>
                <td>
                  <button className="delete-btn">Eliminar</button>
                </td>
              </tr>
              <tr>
                <td>Depilación Láser</td>
                <td>Ana Gómez</td>
                <td>Dr. Carlos Díaz</td>
                <td>2024-07-21</td>
                <td>
                  <button className="edit-btn">Editar</button>
                </td>
                <td>
                  <button className="delete-btn">Eliminar</button>
                </td>
              </tr>
              <tr>
                <td>Limpieza Facial</td>
                <td>Pedro Martínez</td>
                <td>Dra. Laura Sánchez</td>
                <td>2024-07-22</td>
                <td>
                  <button className="edit-btn">Editar</button>
                </td>
                <td>
                  <button className="delete-btn">Eliminar</button>
                </td>
              </tr>
              <tr>
                <td>Masaje Reductivo</td>
                <td>Lucía Fernández</td>
                <td>Dr. José Gómez</td>
                <td>2024-07-23</td>
                <td>
                  <button className="edit-btn">Editar</button>
                </td>
                <td>
                  <button className="delete-btn">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </section>
  </div>;
};

export default Dashboard;
