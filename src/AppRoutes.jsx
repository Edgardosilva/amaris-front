import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import App from './App';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
