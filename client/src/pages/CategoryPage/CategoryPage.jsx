import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchEntries, deleteEntry } from '../../api/api';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import './CategoryPage.css';

export default function CategoryPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, [location.pathname]); 

  useEffect(() => {
    const load = async () => {
      const { data } = await fetchEntries();
      setEntries(data.filter(e => e.category === category));
    };
    load();
  }, [category]);

  const handleDelete = async id => {
    await deleteEntry(id);
    setEntries(entries.filter(e => e._id !== id));
  };

  const handleAddEntry = () => {
    navigate('/add', { state: { category } });
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28FFF', '#FF6666', '#66CC99', '#FF99CC'];

  const pieData = entries.map((entry, idx) => ({
    name: entry.name,
    value: Number(entry.amount),
    color: COLORS[idx % COLORS.length],
  }));

  return (
    <div className="category-container">
      <h2>{category.charAt(0).toUpperCase() + category.slice(1)} Entries</h2>

      {pieData.length > 0 && (
        <>
          <h3>Investment Distribution in {category.charAt(0).toUpperCase() + category.slice(1)}</h3>
          <div className="chart-container">
            <PieChart width={700} height={400}>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={140}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </>
      )}

      <button 
        onClick={handleAddEntry} 
        className="btn btn-primary"
        style={{ margin: '2rem 0' }}
      >
        Add New Entry
      </button>

      <div className="entries-list">
        {entries.length === 0 ? (
          <div className="empty-state">
            <p>No entries found for this category.</p>
            <button 
              onClick={handleAddEntry} 
              className="btn btn-primary"
            >
              Add Your First Entry
            </button>
          </div>
        ) : (
          entries.map(entry => (
            <div key={entry._id} className="entry-item">
              <div className="entry-info">
                <div className="entry-name">{entry.name}</div>
                <div className="entry-amount">₹{Number(entry.amount).toLocaleString()}</div>
                {entry.profit && (
                  <div className={`entry-profit ${entry.profit >= 0 ? 'positive' : 'negative'}`}>
                    {entry.profit >= 0 ? '↑' : '↓'} ₹{Math.abs(Number(entry.profit)).toLocaleString()}
                  </div>
                )}
              </div>
              <div className="entry-actions">
                <button 
                  onClick={() => navigate(`/edit/${entry._id}`)} 
                  className="btn btn-secondary"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(entry._id)} 
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}