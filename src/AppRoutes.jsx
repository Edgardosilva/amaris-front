import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import App from './App';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import Landing from './pages/Landing';
import AdminDashboard from './pages/AdminDashboard';


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/landinPage" element={<Landing />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

