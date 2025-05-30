import express from 'express';
import Category from '../models/Category.js';
import authenticate from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

router.post('/', authenticate, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });

    const exists = await Category.findOne({ name });
    if (exists) return res.status(400).json({ error: 'Category already exists' });

    const category = new Category({ name });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Server error creating category' });
  }
});

export default router;
