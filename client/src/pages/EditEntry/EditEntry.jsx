import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchEntries, updateEntry } from '../../api/api';
import './EditEntry.css';

export default function EditEntry() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    category: '', 
    name: '', 
    amount: '', 
    profit: ''
  });

  useEffect(() => {
    const load = async () => {
      const { data } = await fetchEntries();
      const entry = data.find(e => e._id === id);
      if (entry) {
        setForm(entry);
      }
    };
    load();
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await updateEntry(id, form);
      alert('Entry updated successfully!');
      navigate(`/category/${form.category}`);
    } catch (error) {
      console.error('Failed to update entry:', error);
      alert('Error updating entry. Please try again.');
    }
  };

  return (
    <div className="edit-entry-container">
      <form className="edit-entry-form" onSubmit={handleSubmit}>
        <h2>Edit Entry</h2>
        
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            className="form-control"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            className="form-control"
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="profit">Profit (optional)</label>
          <input
            id="profit"
            className="form-control"
            name="profit"
            type="number"
            value={form.profit}
            onChange={handleChange}
          />
        </div>
        
        <button type="submit" className="submit-btn">Update Entry</button>
      </form>
    </div>
  );
}