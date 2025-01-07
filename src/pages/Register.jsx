import React from 'react';

const Register = () => {
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
                    alt="Amaris Logo"
                    src="/img/amarisLogo.png"
                    className="mx-auto h-40 w-auto"
                />
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-[#52a2b2]">
                    Regístrate en AMARIS
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form action="#" method="POST" className="space-y-6">
                    <div>
                        <label htmlFor="nombre" className="block text-sm/6 font-medium text-gray-900">
                            Nombre
                        </label>
                        <div className="mt-2">
                            <input
                                id="nombre"
                                name="nombre"
                                type="text"
                                required
                                autoComplete="text"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-[#52a2b2] placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#52a2b2]sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="apellido" className="block text-sm/6 font-medium text-gray-900">
                                Apellido
                            </label>
                           
                        </div>
                        <div className="mt-2">
                            <input
                                id="apellido"
                                name="apellido"
                                type="text"
                                required
                                autoComplete="text"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-[#52a2b2] placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#52a2b2] sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                Email
                            </label>
                           
                        </div>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="contraseña" className="block text-sm/6 font-medium text-gray-900">
                                Contraseña
                            </label>
                           
                        </div>
                        <div className="mt-2">
                            <input
                                id="contraseña"
                                name="contraseña"
                                type="contraseña"
                                required
                                autoComplete="current-password"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="telefono" className="block text-sm/6 font-medium text-gray-900">
                                Teléfono
                            </label>
                           
                        </div>
                        <div className="mt-2">
                            <input
                                id="telefono"
                                name="telefono"
                                type="telefono"
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-[#52a2b2] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#52a2b2]"
                        >
                            Registrarse
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    Ya tienes una cuenta?{' '}
                    <a href="/login" className="font-semibold text-[#a6d230] hover:text-indigo-500">
                        Inicia sesión
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Register;