import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../../api/api';
import './Register.css';

const Register = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(form);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert('Registration failed. Please try again.');
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setForm({ ...form, password });
    let strength = 0;
    if (password.length > 5) strength += 1;
    if (password.length > 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        
        <div className="input-group">
          <label htmlFor="email">Email Address</label>
          <input 
            id="email"
            type="email" 
            placeholder="your@email.com" 
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input 
            id="password"
            type="password" 
            placeholder="Create a password" 
            value={form.password}
            onChange={handlePasswordChange}
            required
          />
          <div className="password-strength">
            <div 
              className="strength-bar" 
              style={{
                width: `${passwordStrength * 20}%`,
                background: passwordStrength < 2 ? '#EF4444' : 
                          passwordStrength < 4 ? '#F59E0B' : '#10B981'
              }}
            />
          </div>
        </div>
        
        <button type="submit" className="register-btn">
          Get Started
        </button>
        
        <div className="register-links">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;