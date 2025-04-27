import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <main className=" w-full h-full flex flex-col items-center bg-gradient-to-r from-teal-200 via-green-100 to-teal-200">
            <div className="w-full flex justify-center ">
                <Navbar />
            </div>
            <section className="flex w-full">
                <div className=" h-screen w-full flex justify-center ">
                    {children}
                </div>
            </section>
        </main>
    );
};

export default Layout;

