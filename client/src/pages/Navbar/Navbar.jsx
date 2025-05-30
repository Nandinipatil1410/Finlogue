import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiPieChart, FiPlusCircle, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { FaChartLine } from 'react-icons/fa';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-brand" onClick={() => navigate('/')}>
          <FaChartLine className="logo-icon" />
          <span className="logo-text">Finlogue</span>
        </div>

        <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
          {isLoggedIn && (
            <>
              <NavItem 
                to="/dashboard" 
                icon={<FiPieChart />} 
                text="Dashboard" 
              />
              <NavItem 
                to="/add" 
                icon={<FiPlusCircle />} 
                text="Add Transaction" 
              />
              <button onClick={handleLogout} className="logout-btn">
                <FiLogOut className="icon" />
                <span>Logout</span>
              </button>
            </>
          )}
        </div>

        <button 
          className={`hamburger ${isOpen ? 'active' : ''}`} 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>
    </nav>
  );
}

const NavItem = ({ to, icon, text }) => (
  <Link to={to} className="nav-link">
    <span className="icon">{icon}</span>
    <span className="text">{text}</span>
  </Link>
);