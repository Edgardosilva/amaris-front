import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <main className="bg-slate-100 h-screen max-w-[1200px] mx-auto">
            <Navbar />
            <section className="flex bg-slate-100">
                <Sidebar />
                <div className="bg-slate-100 h-full w-full flex justify-center mt-[117px] ml-[200px]">
                    {children}
                </div>
            </section>
        </main>
    );
};

export default Layout;
