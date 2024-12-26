import React from 'react';

const Sidebar = () => {
    return (
        <div className='w-[200px] border border-gray-100 h-screen mt-[117px] bg-white shadow-md fixed'>
            <ul className=' text-lg flex flex-col gap-5 p-5 hover:cursor-pointer text-[#52a2b2]'>
                <li>Dashboard</li>
                <li>Tus horas</li>
                <li>Procedimientos</li>
                <li>Contacto</li>
            </ul>
        </div>
    );
};

export default Sidebar;