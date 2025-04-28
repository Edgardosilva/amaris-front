import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import Loader from '../components/Loader';

const UserDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('https://amaris-api-production.up.railway.app/login/auth/me', {
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

  useEffect(() => {
    if (isAuthenticated !== null) { // cuando se sabe si está autenticado o no
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500); // 1.5 segundos

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <div className='bg-gradient-to-r from-teal-200 via-green-100 to-teal-200 min-h-screen flex items-center justify-center'>
        <Loader />
      </div>
    );
  }

  if (!isAuthenticated) {
    navigate('/login'); // si no está autenticado, lo manda al login
    return null;
  }

  return (
    <div className='bg-gradient-to-r from-teal-200 via-green-100 to-teal-200 min-h-screen'>
      <Dashboard />
    </div>
  );
}

export default UserDashboard;
