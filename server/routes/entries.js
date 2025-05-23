const express = require('express');
const router = express.Router();
const Entry = require('../models/Entry');
const auth = require('../middleware/authMiddleware');

// GET all entries for user
router.get('/', auth, async (req, res) => {
    const entries = await Entry.find({ userId: req.user.id });
    res.json(entries);
});

// POST create entry
router.post('/', auth, async (req, res) => {
    const entry = new Entry({ ...req.body, userId: req.user.id });
    await entry.save();
    res.status(201).json(entry);
});

// PUT update entry
router.put('/:id', auth, async (req, res) => {
    const updated = await Entry.findOneAndUpdate({ _id: req.params.id, userId: req.user.id }, req.body, { new: true });
    res.json(updated);
});

// DELETE entry
router.delete('/:id', auth, async (req, res) => {
    await Entry.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.json({ message: 'Deleted' });
});

module.exports = router;
