import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import AddEntry from './pages/AddEntry/AddEntry';
import PrivateRoute from './components/PrivateRoute';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import EditEntry from './pages/EditEntry/EditEntry';
import Navbar from './pages/Navbar/Navbar';
import LandingPage from './pages/Landing Page/LandingPage';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/add" element={<PrivateRoute><AddEntry /></PrivateRoute>} />
        <Route path="/category/:category" element={<PrivateRoute><CategoryPage /></PrivateRoute>} />
        <Route path="/edit/:id" element={<PrivateRoute><EditEntry /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
