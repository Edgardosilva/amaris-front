import React from 'react';

const Navbar = () => {
    return (
        <nav className='shadow-md fixed w-[1200px]' >
            <section className='flex justify-between items-center bg-white p-4 border-b border-gray-100'>
                <img src="/img/amarisLogo.png" alt="logo" className='w-16 {ml-7'/>
                <ul className='flex text-xl' >
                    <li className='mr-4 text-[#a6d230]'>Quienes somos</li>
                    <li className='mr-4 text-[#a6d230]'>Agenda tu hora</li>
                    <li className='mr-4 text-[#a6d230]'>Procedimientos</li>
                    <li className='mr-4 text-[#a6d230]'>Contacto</li>
                </ul>
            </section>
        </nav>
    );
};

export default Navbar;