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
        navigate('/landinPage');
    }
    
    const goToAgendar = () => {
        navigate('/');
    }
    

    return (
        <div className='w-[200px]  h-screen mt-[80px] bg-white fixed pt-10'>
            <ul className=' text-lg flex flex-col gap-5 p-5 hover:cursor-pointer text-[#52a2b2]'>
                { sessionStorage.getItem('access_token') ? <li onClick={goDashboard}>Mis citas</li> : null }
                <li onClick={goToAgendar}>Agendar cita</li>
                <li>Procedimientos</li>
                <li>Contacto</li>
                { sessionStorage.getItem('access_token') ? <button onClick={logout} className="bg-green-300 p-0 m-0 " >Cerrar Session</button> : null }
            </ul>
        </div>
    );
};

export default Sidebar;