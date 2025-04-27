import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import DateResume from '../components/DateResume';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const EmailConfirmation = () => {

    const { token } = useParams();
    const [cita, setCita] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCita = async () => {
          try {
            const res = await fetch(`http://localhost:3000/appointments/confirmar-cita/${token}/detalles`);
 
            if (!res.ok) {
              const rawError = await res.text();
              console.error("Respuesta cruda del backend:", rawError);
              throw new Error("Respuesta inesperada del servidor");
            }
            const data = await res.json();
            setCita(data.cita);
          } catch (error) {
            console.error("Error al obtener la cita:", error.message);
          }
        };
      
        fetchCita();
      }, [token]);

      const logout = async () => {
        try {
          await fetch('http://localhost:3000/login/logout', {
            method: 'POST',
            credentials: 'include', 
          });
          navigate('/'); 
        } catch (error) {
          console.error('Error al cerrar sesión:', error);
        }
      };

      const goToAgendar = () => {
        navigate('/formAppointment')
      }
      

    return (
        <Layout>
            <div className=" h-fit m-10 p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4 text-left border border-gray-200">
                <h1 className="text-2xl font-bold text-green-600 text-center">¡Cita confirmada! 🎉</h1>
                    {cita ? (
                        <>
                            <div className="space-y-2">
                                <p><span className="font-semibold text-gray-700">Paciente:</span> {cita.paciente_atendido}</p>
                                <p><span className="font-semibold text-gray-700">Procedimiento:</span> {cita.nombre_procedimiento}</p>
                                <p><span className="font-semibold text-gray-700">Fecha:</span> {cita.fecha.slice(0, 10)}</p>
                                <p><span className="font-semibold text-gray-700">Hora:</span> {cita.hora.slice(0, 5)} hrs</p>
                                <p><span className="font-semibold text-gray-700">Término:</span> {cita.horaTermino.slice(0, 5)} hrs</p>
                                <p><span className="font-semibold text-gray-700">Box asignado:</span> {cita.box}</p>
                                <p><span className="font-semibold text-gray-700">Estado:</span>
                                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${cita.estado === "Confirmada"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-yellow-100 text-yellow-700"
                                        }`}>
                                        {cita.estado}
                                    </span>
                                </p>
                                <div className=" pt-5 flex flex-col md:flex-row justify-center gap-4 mt-6">
                                    <button
                                        onClick={goToAgendar}
                                        className="bg-[#a6d230] hover:bg-[#8dc122] text-black font-semibold py-2 px-4 rounded-md shadow-md transition"
                                    >
                                        Agendar otra hora
                                    </button>

                                    <button
                                        onClick={logout}
                                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition"
                                    >
                                        Cerrar sesión
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <p className="text-gray-500 text-center">Cargando detalles...</p>
                    )}
            </div>
        </Layout>
    );
};

export default EmailConfirmation;

