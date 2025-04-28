import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {

    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const navigate = useNavigate();

    const handleChanges = (e) => {
        if (e.target.name === "email") {
            setUserEmail(e.target.value);
        } else {
            setUserPassword(e.target.value);
        }
    }

    const login = async (e) => {
        try {
            e.preventDefault();
            const response = await fetch("https://amaris-api-production.up.railway.app/login", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "email": userEmail,
                    "contraseña": userPassword,
                }),
            });
    
            if (response.ok) {
                const data = await response.json();
                const token = data.token;

                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Sesión iniciada correctamente!",
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    navigate('/formAppointment'); // 🔹 Navega solo después de que la alerta desaparezca
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Correo o contraseña incorrectos",
                });
            }
        } catch (error) {
            console.error("Error al hacer login:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Hubo un problema con el servidor",
            });
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    alt="Amaris Logo"
                    src="/img/amarisLogo.png"
                    className="mx-auto h-40 w-auto"
                />
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-[#52a2b2]">
                    Inicia sesión con tu cuenta
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form action='submit' onSubmit={login} method="POST" className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                            Email
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                onChange={handleChanges}
                                value={userEmail}
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
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                Contraseña
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                onChange={handleChanges}
                                value={userPassword}
                                name="password"
                                type="password"
                                required
                                autoComplete="current-password"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-[#52a2b2] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    No tienes una cuenta?{' '}
                    <a href="/register" className="font-semibold text-[#a6d230] hover:text-indigo-500">
                        Regístrate en AMARIS
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;