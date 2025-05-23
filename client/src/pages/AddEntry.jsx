import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { createEntry } from '../api/api';

const categories = [
  'stocks', 'mutual funds', 'real estate', 'gold physical',
  'fd', 'rd', 'bank savings account', 'crypto'
];

export default function AddEntry() {
  const location = useLocation();
  const preselectedCategory = location.state?.category || 'stocks';

  const [form, setForm] = useState({
    category: preselectedCategory,
    name: '',
    amount: '',
    profit: '',
  });

  // If category from location changes, update form.category
  useEffect(() => {
    if (location.state?.category) {
      setForm(f => ({ ...f, category: location.state.category }));
    }
  }, [location.state]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await createEntry(form);
    alert('Entry added!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Entry</h2>

      <label>Category:
        <select name="category" value={form.category} onChange={handleChange}>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </label><br/>

      <label>Name:
        <input name="name" value={form.name} onChange={handleChange} required />
      </label><br/>

      <label>Amount:
        <input name="amount" type="number" value={form.amount} onChange={handleChange} required />
      </label><br/>

      <label>Profit:
        <input name="profit" type="number" value={form.profit} onChange={handleChange} />
      </label><br/>

      <button type="submit">Add</button>
    </form>
  );
}
