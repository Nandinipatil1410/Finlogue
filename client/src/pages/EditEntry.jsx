import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchEntries, updateEntry } from '../api/api';

export default function EditEntry() {
  const { id } = useParams();
  const [form, setForm] = useState({
    category: '', name: '', amount: '', profit: ''
  });

  useEffect(() => {
    const load = async () => {
      const { data } = await fetchEntries();
      const entry = data.find(e => e._id === id);
      setForm(entry);
    };
    load();
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await updateEntry(id, form);
    alert('Updated!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Entry</h2>
      <input name="name" value={form.name} onChange={handleChange} required />
      <input name="amount" type="number" value={form.amount} onChange={handleChange} required />
      <input name="profit" type="number" value={form.profit} onChange={handleChange} />
      <button type="submit">Update</button>
    </form>
  );
}
