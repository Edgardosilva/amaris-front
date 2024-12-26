import React from 'react';
import { useState } from 'react';

const FormAppoiment = ({ formData, setFormData, setLoader }) => {


    // Función para manejar el cambio de los campos del formulario
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    // Función para manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoader(true);
    };

    return (
        <section className="m-10 max-w-4xl p-6 bg-white rounded-md shadow-md flex flex-col items-center justify-center ">
            <h1 className="font-bold text-3xl text-[#a6d230]">Bienvenido a Amaris</h1>
            <h2 className="text-lg font-semibold text-[#52a2b2] capitalize">¡Agenda tu hora!</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div>
                        <label className="text-gray-700" htmlFor="nombre">Nombre</label>
                        <input id="nombre" type="text" onChange={handleChange} value={formData.nombre} required className="block w-full px-4 py-2 mt-2 text-[#52a2b2] bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" />
                    </div>

                    <div>
                        <label className="text-gray-700" htmlFor="apellido">Apellido</label>
                        <input id="apellido" type="text" onChange={handleChange} value={formData.apellido} required className="block w-full px-4 py-2 mt-2 text-[#52a2b2] bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" />
                    </div>

                    <div>
                        <label className="text-gray-700" htmlFor="telefono">Teléfono</label>
                        <input id="telefono" type="number" onChange={handleChange} value={formData.telefono} required className="block w-full px-4 py-2 mt-2 text-[#52a2b2] bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" />
                    </div>

                    <div>
                        <label className="text-gray-700" htmlFor="correo">Correo</label>
                        <input id="correo" type='email' onChange={handleChange} value={formData.correo} required className="block w-full px-4 py-2 mt-2 text-[#52a2b2] bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" />
                    </div>
                </div>

                <div className="flex justify-end mt-6">
                    <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-[#52a2b2] rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Continuar</button>
                </div>
            </form>
        </section>
    );
};

export default FormAppoiment;