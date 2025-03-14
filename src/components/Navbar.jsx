import React from 'react';
import { useNavigate } from 'react-router-dom';
import DropDownProfile from './DropDownProfile';

const Navbar = () => {

    const navigate = useNavigate();

    const goToAgendar = () => {
        navigate('/formAppointment');
    }

    return (
        <nav className=" font-gabarito shadow-md text-[#208ea4] z-20 w-full flex items-center justify-center bg-white bg-opacity-50 ">
            <section className="min-w-[1200px] flex justify-between items-center">
                <img src="/img/amarisLogo.png"
                    alt="logo"
                    className="p-2 w-16 ml-7"
                     />
                <ul className="flex text-[14px] items-center">
                    <li className="mr-4 hover:text-[#a6d230] cursor-pointer transition">NOSOTROS</li>
                    {sessionStorage.getItem('access_token') ? <li className="mr-4 hover:text-[#a6d230] cursor-pointer transition" onClick={goToAgendar}>AGENDAR</li> : null}
                    <li className="mr-4 hover:text-[#a6d230] cursor-pointer transition">TRATAMIENTOS</li>
                    <li className="mr-4 hover:text-[#a6d230] cursor-pointer transition">CONTACTO</li>
                    {sessionStorage.getItem('access_token') ?
                    <DropDownProfile />
                    : null}
                </ul>
            </section>
        </nav>
    );
};

export default Navbar;

