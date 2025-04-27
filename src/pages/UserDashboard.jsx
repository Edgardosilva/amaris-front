import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard';

const UserDashboard = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
          try {
            const response = await fetch('http://localhost:3000/login/auth/me', {
              credentials: 'include'
            });
            const data = await response.json();
            setIsAuthenticated(data.authenticated);
          } catch (error) {
            setIsAuthenticated(false);
          }
        };
        checkAuth();
      }, []);
    

    return (
        <div className='bg-gradient-to-r from-teal-200 via-green-100 to-teal-200'>
            {isAuthenticated ? <Dashboard /> : 'Cargando...'}
        </div>
    )
}

export default UserDashboard;


