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
    if (isAuthenticated === false) {
      navigate('/login');
    } else if (isAuthenticated === true) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500); // 1.5 segundos de carga falsa extra solo para usuarios logueados
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div className='bg-gradient-to-r from-teal-200 via-green-100 to-teal-200 min-h-screen flex items-center justify-center'>
        <Loader />
      </div>
    );
  }

  return (
    <div className='bg-gradient-to-r from-teal-200 via-green-100 to-teal-200 min-h-screen'>
      <Dashboard />
    </div>
  );
}

export default UserDashboard;
