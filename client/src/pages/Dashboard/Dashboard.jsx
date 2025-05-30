import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { fetchEntries, getCategories, addCategory } from '../../api/api';
import './Dashboard.css';

const defaultCategories = [
  'stocks', 'mutual funds', 'real estate', 'gold physical',
  'fd', 'rd', 'bank savings account', 'crypto'
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28FFF', '#FF6666', '#66CC99', '#FF99CC'];

function generateRandomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

export default function Dashboard() {
  const [entries, setEntries] = useState([]);
  const [customCategories, setCustomCategories] = useState([]);
  const [customColors, setCustomColors] = useState({});
  const [newCategory, setNewCategory] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const [entriesRes, categoriesRes] = await Promise.all([
        fetchEntries(),
        getCategories()
      ]);
      setEntries(entriesRes.data);

      const backendCats = categoriesRes.data.map(c => c.name);
      const onlyCustom = backendCats.filter(cat => !defaultCategories.includes(cat));
      setCustomCategories(onlyCustom);

      setCustomColors(prevColors => {
        const newColors = { ...prevColors };
        onlyCustom.forEach(cat => {
          if (!newColors[cat]) {
            newColors[cat] = generateRandomColor();
          }
        });
        return newColors;
      });
    };
    load();
  }, []);

  const allCategories = [...defaultCategories, ...customCategories];

  const handleAddCategory = async () => {
    const trimmed = newCategory.trim().toLowerCase();
    if (!trimmed || allCategories.includes(trimmed)) return;

    try {
      await addCategory({ name: trimmed });
      setCustomCategories(prev => [...prev, trimmed]);
      setCustomColors(prev => ({
        ...prev,
        [trimmed]: generateRandomColor()
      }));
      setNewCategory('');
    } catch (err) {
      alert(err.response?.data?.error || 'Could not add category');
    }
  };

  const data = allCategories.map((cat, idx) => {
    const total = entries
      .filter(e => e.category === cat)
      .reduce((sum, e) => sum + Number(e.amount), 0);

    const color = defaultCategories.includes(cat)
      ? COLORS[defaultCategories.indexOf(cat) % COLORS.length]
      : (customColors[cat] || '#000000');

    return { name: cat, value: total, color };
  }).filter(item => item.value > 0);

  const totalInvestment = entries.reduce((sum, e) => sum + Number(e.amount || 0), 0);

  return (
    <div className="dashboard-container">

      {/* Total Investment */}
      <div className="total-investment-box">
        <h2>Total Investment</h2>
        <div className="amount">₹{totalInvestment.toLocaleString()}</div>
      </div>

      {/* Pie Chart */}
      <div className="pie-chart-container">
        <h3>Portfolio Distribution</h3>
        {data.length === 0 ? (
          <p>No investments yet</p>
        ) : (
          <PieChart width={650} height={400}>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={140}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        )}
      </div>

      {/* Add Category */}
      <div className="add-category">
        <input
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Add new category"
        />
        <button onClick={handleAddCategory}>Add Category</button>
      </div>

      {/* Categories */}
      <div className="investment-categories">
        <h2>Investment Categories</h2>
        <div className="categories-grid">
          {allCategories.map(cat => (
            <div
              key={cat}
              onClick={() => navigate(`/category/${cat}`)}
              className="category-card"
              style={{
                borderLeft: `10px solid ${
                  defaultCategories.includes(cat)
                    ? COLORS[defaultCategories.indexOf(cat) % COLORS.length]
                    : customColors[cat]
                }`
              }}
            >
              <h3>{cat.toUpperCase()}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
