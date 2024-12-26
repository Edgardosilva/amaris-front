import React from 'react';

const CardProcedure = ({ procedure, selectedId }) => {
    return (
        <div
            key={procedure.id}
            onClick={() => handleClick(procedure.id)}
            className={` max-w-sm p-6 rounded-md shadow-md flex-grow cursor-pointer ${selectedId === procedure.id ? 'bg-blue-500 text-white' : 'bg-white'
                }`}
        >
            <h2 className="text-lg font-semibold text-gray-700">
                {procedure.name}
            </h2>
            <p className="text-gray-600">Duración: {procedure.duration} min</p>
            <p className="text-gray-600">Box: {procedure.box}</p>
            <p className="text-gray-600">
                Sesiones simultáneas: {procedure.concurrentSessions}
            </p>
        </div>
    );
};

export default CardProcedure;