import React from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
  'stocks', 'mutual funds', 'real estate', 'gold physical',
  'fd', 'rd', 'bank savings account', 'crypto'
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Investment Categories</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
        {categories.map(cat => (
          <div
            key={cat}
            onClick={() => navigate(`/category/${cat}`)}
            style={{
              cursor: 'pointer',
              border: '1px solid #ccc',
              padding: '20px',
              borderRadius: '8px',
              width: '150px',
              textAlign: 'center',
              boxShadow: '2px 2px 5px rgba(0,0,0,0.1)',
            }}
          >
            <h3>{cat.toUpperCase()}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
