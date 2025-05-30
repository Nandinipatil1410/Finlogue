import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import categoryRoutes from './routes/categoryRoutes.js';
import authRoutes from './routes/auth.js';
import entriesRoutes from './routes/entries.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());
app.use('/api/categories', categoryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/entries', entriesRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.listen(5000, () => console.log("Server running on port 5000"));
