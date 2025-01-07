import React, { useEffect } from 'react';
import { procedures } from '../procedures';
import { useState } from 'react';

const Procedures = ({ formData, setFormData, setIsProcedure, isProcedure }) => {

    const [selectedId, setSelectedId] = useState(null);
    const [selectedProcedure, setSelectedProcedure] = useState({});
    const [procedimientos, setProcedimientos] = useState(procedures);


    const findprocedure = (id) => {
        return procedures.find((procedure) => procedure.id === id);
    }

    const handleClick = (id) => {
        setSelectedId(id);
        const procedure = findprocedure(id);
        setSelectedProcedure(procedure);
    };


    const btnContinue = () => {
        const formWithProcedure = { ...formData, procedimiento: selectedProcedure };
        setFormData(formWithProcedure);
        setIsProcedure(!isProcedure);
    };


    return (
        <>
            <div className="flex flex-wrap p-10 justify-center gap-6">
                <h1 className="w-full text-xl font-semibold text-center text-[#52a2b2] capitalize mb-6">
                    ¿Qué servicio deseas?
                </h1>
                {procedures.map((procedure) => (
                    <div
                        key={procedure.id}
                        onClick={() => handleClick(procedure.id)}
                        className={`text-sm w-[300px] p-6 rounded-md shadow-md cursor-pointer ${selectedId === procedure.id ? 'bg-green-100 text-white' : 'bg-white'
                            }`}
                    >
                        <div className='w-full h-40 flex items-center justify-center overflow-hidden rounded-md mb-3'>
                            <img src={procedure.imgUrl} alt="imgUrl"/>
                        </div>
                        <h2 className=" text-md font-semibold text-gray-700">
                            {procedure.name}
                        </h2>
                        <p className="text-gray-600">Duración: {procedure.duration} min</p>
                        <p className="text-gray-600">Box: {procedure.box}</p>
                        <p className="text-gray-600">
                            Sesiones simultáneas: {procedure.concurrentSessions}
                        </p>
                    </div>
                ))}
            </div>
            <div className="flex justify-end mt-6">
                <button
                    onClick={btnContinue}
                    className="m-20 px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-[#52a2b2] rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                >
                    Continuar
                </button>
            </div>
        </>
    );
};

export default Procedures;