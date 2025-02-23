import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard';

const UserDashboard = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        verificarAutenticacion();
    },[])

    const verificarAutenticacion = async () => {
        try {
            const token = sessionStorage.getItem('access_token');
            if (!token) {
                throw new Error('No token found');
            }
    
            const response = await fetch('http://localhost:3000/login/verificarToken', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, // Envía el token en los headers
                },
            });
            if (!response.ok) {
                throw new Error('No autorizado');
            }
            const data = await response.json();
            setIsAuthenticated(true)
            return data.authenticated; // true si está autenticado
        } catch (error) {
            console.error('Error de autenticación:', error.message);
            return false; // No autenticado
        }
    };
    

    return (
        <div>
            {isAuthenticated ? <Dashboard /> : 'Cargando...'}
        </div>
    )
}

export default UserDashboard;


