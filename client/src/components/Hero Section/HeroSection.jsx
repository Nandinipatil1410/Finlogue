import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import heroImg from '../../assets/hero-illustration.svg';
import './HeroSection.css'

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <div className="hero-container">
        {/* Text Section */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="hero-content"
        >
          <h1 className="hero-title">
            Take Charge of Your <span>Finances</span>
          </h1>
          <p className="hero-subtitle">
            Track investments, analyze portfolios, and grow wealth — all in one intelligent dashboard.
          </p>
          <div className="hero-buttons">
            <button
              onClick={() => navigate('/register')}
              className="primary-button"
            >
              Register
            </button>
            <button
              onClick={() => navigate('/login')}
              className="secondary-button"
            >
              Login
            </button>
          </div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="hero-image-container"
        >
          <img
            src={heroImg}
            alt="Finlogue Hero Illustration"
            className="hero-image"
          />
        </motion.div>
      </div>
      
      {/* Floating animated elements */}
      <div className="floating-element-1"></div>
      <div className="floating-element-2"></div>
    </section>
  );
}