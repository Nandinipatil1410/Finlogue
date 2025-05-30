import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createEntry, getCategories } from '../../api/api';
import './AddEntry.css';

const defaultCategories = [
  'stocks', 'mutual funds', 'real estate', 'gold physical',
  'fd', 'rd', 'bank savings account', 'crypto'
];

export default function AddEntry() {
  const location = useLocation();
  const navigate = useNavigate();
  const preselectedCategory = location.state?.category || '';

  const [form, setForm] = useState({
    category: preselectedCategory,
    name: '',
    amount: '',
    profit: '',
  });

  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    if (location.state?.category) {
      setForm(f => ({ ...f, category: location.state.category }));
    }
  }, [location.state]);

  useEffect(() => {
    const loadCategories = async () => {
      const res = await getCategories();
      const backendCategories = res.data.map(c => c.name);
      const merged = Array.from(new Set([...defaultCategories, ...backendCategories]));
      setAllCategories(merged);
    };
    loadCategories();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await createEntry(form);
      alert('Entry added successfully!');
      navigate(`/category/${form.category}`);
    } catch (error) {
      console.error('Failed to add entry:', error);
      alert('Error adding entry. Please try again.');
    }
  };

  return (
    <div className="add-entry-wrapper">
      <div className="add-entry-container">
        <form className="add-entry-form" onSubmit={handleSubmit}>
          <h2>Add New Investment</h2>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              className="form-control"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select category</option>
              {allCategories.map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="name">Investment Name</label>
            <input
              id="name"
              name="name"
              type="text"
              className="form-control"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g., Apple Stocks, XYZ Mutual Fund"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount">Amount Invested (₹)</label>
            <input
              id="amount"
              name="amount"
              type="number"
              className="form-control"
              value={form.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="profit">Current Profit/Loss (₹)</label>
            <input
              id="profit"
              name="profit"
              type="number"
              className="form-control"
              value={form.profit}
              onChange={handleChange}
              placeholder="Optional"
              step="0.01"
            />
          </div>

          <button type="submit" className="submit-btn">
            Add Investment
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}