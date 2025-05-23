import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddEntry from './pages/AddEntry';
import PrivateRoute from './components/PrivateRoute';
import CategoryPage from './pages/CategoryPage';
import EditEntry from './pages/EditEntry';



const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/add" element={<PrivateRoute><AddEntry /></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/edit/:id" element={<EditEntry />} />
    </Routes>
  );
};

export default App;
