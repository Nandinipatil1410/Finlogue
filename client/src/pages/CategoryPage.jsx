import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchEntries, deleteEntry } from '../api/api';

export default function CategoryPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);

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
    // Navigate to AddEntry page with category as state or query param
    navigate('/add', { state: { category } });
  };

  return (
    <div>
      <h2>{category.toUpperCase()} Entries</h2>

      <button onClick={handleAddEntry} style={{ marginBottom: '15px' }}>
        Add Entry
      </button>

      {entries.length === 0 && <p>No entries found.</p>}

      {entries.map(entry => (
        <div key={entry._id} style={{ marginBottom: '10px' }}>
          <strong>{entry.name}</strong> - ₹{entry.amount} - Profit ₹{entry.profit}
          {/* Assuming you have edit link and delete button */}
          <button onClick={() => navigate(`/edit/${entry._id}`)} style={{ marginLeft: '10px' }}>
            Edit
          </button>
          <button onClick={() => handleDelete(entry._id)} style={{ marginLeft: '5px' }}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
