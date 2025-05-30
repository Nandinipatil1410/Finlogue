import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../api/api';
import './Login.css';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>
        
        <div className="input-group">
          <input 
            type="email" 
            placeholder="Email Address" 
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })} 
            required
          />
        </div>
        
        <div className="input-group">
          <input 
            type="password" 
            placeholder="Password" 
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })} 
            required
          />
        </div>
        
        <button type="submit" className="login-btn">Sign In</button>
        
        <div className="login-links">
          <Link to="/register">Create Account</Link>
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;