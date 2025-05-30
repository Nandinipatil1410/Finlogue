import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import Hero from '../../components/Hero Section/HeroSection';

export default function LandingPage() {
  return (
    <div className="landing-page">
      <Hero />
      
      <section className="features-section">
        <div className="features-container">
          <h2 className="section-title">Why Choose <span>Finlogue</span></h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📉</div>
              <h3>Visual Portfolio Insights</h3>
              <p>Track and visualize your investments with dynamic pie charts that update as you add or modify entries — giving you instant clarity.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📂</div>
              <h3>Custom Categories & Entries</h3>
              <p>Create and manage investment categories that truly match your financial world — from stocks to “Insurance” or even “Corporate Bonds”.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Effortless Tracking, All in One Place</h3>
              <p>Log every investment with details like name, amount, and profit — and access them easily by category or timeline. No spreadsheets needed.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-container">
          <h2>Ready to Transform Your Investment Tracking?</h2>
          <p>Start today and see where your money is really going.</p>
          <Link to="/register" className="cta-button">Use Finlogue Now</Link>
        </div>
      </section>
    </div>
  );
}