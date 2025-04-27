import React from 'react';
import { useNavigate } from 'react-router-dom';
import DropDownProfile from './DropDownProfile';
import { useEffect, useState } from 'react';

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    const goToAgendar = () => {
        navigate('/formAppointment');
    }

    useEffect(() => {
        const checkAuth = async () => {
          try {
            const response = await fetch('http://localhost:3000/login/auth/me', {
              credentials: 'include'
            });
      
            const data = await response.json();
      
            if (data.authenticated) {
              setIsAuthenticated(true);
              setUser(data.user); 
            } else {
              setIsAuthenticated(false);
              setUser(null);
            }
          } catch (error) {
            console.error('Error al verificar autenticación:', error);
            setIsAuthenticated(false);
            setUser(null);
          }
        };
      
        checkAuth();
      }, []);
      

    return (
        <nav className="font-gabarito shadow-md text-[#208ea4] z-20 w-full items-center justify-center bg-white bg-opacity-50 ">
            <section className="md:max-w-[1200px] flex justify-between items-center mx-auto">
                <img src="/img/amarisLogo.png"
                    alt="logo"
                    className="hidden md:flex p-2 w-12 md:w-16 ml-7"
                     />
                <ul className="flex text-[10px] md:text-[14px] items-center p-2 w-full justify-between md:justify-end h-[50px]">
                    <li className="mr-4 hover:text-[#a6d230] cursor-pointer transition">NOSOTROS</li>
                    {isAuthenticated && (
                        <li className="mr-4 hover:text-[#a6d230] cursor-pointer transition" onClick={goToAgendar}>AGENDAR</li>
                    )}
                    <li className="mr-4 hover:text-[#a6d230] cursor-pointer transition">TRATAMIENTOS</li>
                    <li className="mr-4 hover:text-[#a6d230] cursor-pointer transition">CONTACTO</li>
                    {isAuthenticated && <DropDownProfile user={user} isAuthenticated={isAuthenticated}/>}
                </ul>
            </section>
        </nav>
    );
};

export default Navbar;

