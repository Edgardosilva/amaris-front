import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {

    const navigate = useNavigate();
    const goDashboard = () => {
        navigate('/userdashboard');
        console.log('click')
    }

    const logout = () => {
        sessionStorage.removeItem('access_token');
        navigate('/');
    }
    
    const goToAgendar = () => {
        navigate('/formAppointment');
    }
    

    return (
        <div className='w-[220px] shadow-md h-screen bg-gradient-to-t from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,0.6)] fixed pt-10 '>
            <ul className=' text-md flex flex-col items-left gap-5 p-5 hover:cursor-pointer text-[#52a2b2]'>
                { sessionStorage.getItem('access_token') ? 
                <div className='flex gap-3 p-3 rounded-md hover:bg-[#a7d230b4] hover:text-white transition'>
                    <img src="/icons/calendar-check.svg" alt="calendarIcon" className='w-6 hover:filter hover:brightness-0 hover:invert' />
                    <li onClick={goDashboard}>Mis citas</li>
                </div> : null }
                <div className='flex gap-3 p-3 rounded-md hover:bg-[#a7d230b4] hover:text-white transition'>
                    <img src="/icons/journal-medical.svg" alt="appointmentIcon" className='w-6' />
                    <li onClick={goToAgendar}>Agendar Cita</li>
                </div>
                <div className='flex gap-3 p-3 rounded-md hover:bg-[#a7d230b4] hover:text-white transition'>
                    <li>Contacto</li>
                </div>
                {sessionStorage.getItem('access_token') ?
                    <div className='flex gap-3 border bg-green-300 rounded-md'>
                        <img src="/icons/box-arrow-in-left.svg" alt="contactIcon" className='w-7' />
                        <button onClick={logout}>Logout</button>
                    </div>
                    : null}
            </ul>
        </div>
    );
};

export default Sidebar;