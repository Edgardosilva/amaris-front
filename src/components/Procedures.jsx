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
            <div className="flex flex-wrap p-10 justify-center gap-5">
                <h1 className="w-full text-xl font-semibold text-center text-[#52a2b2] capitalize mb-6">
                    ¿Qué servicio deseas?
                </h1>
                {procedures.map((procedure) => (
                    <div
                        key={procedure.id}
                        onClick={() => handleClick(procedure.id)}
                        className={`hover:bg-[#52a2b2] hover:transition-all text-[14px] w-[300px] p-3 rounded-md shadow-md cursor-pointer ${selectedId === procedure.id ? 'bg-green-100 text-white' : 'bg-white'
                            }`}
                    >
                        <h2 className=" text-md font-semibold text-gray-700">
                            {procedure.name}
                        </h2>
                        <p className="text-gray-600">Duración: {procedure.duration} min</p>
                    </div>
                ))}
            </div>
            {
                selectedId && (
                    <div className="flex justify-center">
                        <button
                            onClick={btnContinue}
                            className=" px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-[#52a2b2] rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                        >
                            Continuar
                        </button>
                    </div>
                )
            }
        </>
    );
};

export default Procedures;