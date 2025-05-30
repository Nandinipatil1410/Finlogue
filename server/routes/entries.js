import express from 'express';
import Entry from '../models/Entry.js';
import authenticate from '../middleware/authMiddleware.js';

const router = express.Router();

// GET all entries for user
router.get('/', authenticate, async (req, res) => {
  const entries = await Entry.find({ userId: req.user.id });
  res.json(entries);
});

// POST create entry
router.post('/', authenticate, async (req, res) => {
  const entry = new Entry({ ...req.body, userId: req.user.id });
  await entry.save();
  res.status(201).json(entry);
});

// PUT update entry
router.put('/:id', authenticate, async (req, res) => {
  const updated = await Entry.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );
  res.json(updated);
});

// DELETE entry
router.delete('/:id', authenticate, async (req, res) => {
  await Entry.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  res.json({ message: 'Deleted' });
});

export default router;
