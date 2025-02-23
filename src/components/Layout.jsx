import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <main className="bg-slate-100 h-screen flex flex-col items-center ">
            {/* Envuelve el Navbar en un div que tenga el mismo ancho que el contenido */}
            <div className="w-full flex justify-center">
                <Navbar />
            </div>
            
            <section className="flex bg-slate-100 w-full max-w-[1200px]">
                <Sidebar />
                <div className="bg-slate-100 h-full w-full flex justify-center mt-[80px] ml-[200px]">
                    {children}
                </div>
            </section>
        </main>
    );
};

export default Layout;

