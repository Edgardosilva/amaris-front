import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const navigate = useNavigate();
    const goToHome = () => {
        navigate('/');
    }

    return (
        <nav className="bg-white fixed font-gabarito z-20 w-full flex justify-center">
        <section className="w-[1200px] flex justify-between items-center bg-white">
            <img src="/img/amarisLogo.png" 
                 alt="logo" 
                 className="p-1 w-16 ml-7 cursor-pointer" 
                 onClick={goToHome} />
            <ul className="flex text-lg">
                <li className="mr-4 hover:text-[#a6d230] cursor-pointer transition">Quienes somos</li>
                <li className="mr-4 hover:text-[#a6d230] cursor-pointer transition">Agenda tu hora</li>
                <li className="mr-4 hover:text-[#a6d230] cursor-pointer transition">Procedimientos</li>
                <li className="mr-4 hover:text-[#a6d230] cursor-pointer transition">Contacto</li>
            </ul>
        </section>
    </nav>
    );
};

export default Navbar;

