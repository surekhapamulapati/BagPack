const express = require('express');
const mongoose = require('mongoose');
const Checklist = require('../models/Checklist');

const router = express.Router();

// ✅ Save a new checklist
router.post('/save', async (req, res) => {
  try {
    const { userId, tripName, destination, tripType, date, travelers, items } = req.body;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid or missing userId" });
    }

    const checklist = new Checklist({
      userId: new mongoose.Types.ObjectId(userId),
      tripName,
      destination,
      tripType,
      date,
      travelers,
      items,
    });

    await checklist.save();
    res.status(201).json({ message: 'Checklist saved', checklist });
  } catch (err) {
    console.error("❌ Error saving checklist:", err);
    res.status(500).json({ message: 'Error saving checklist', error: err.message });
  }
});

// ✅ Get all checklists for a user
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid userId' });
    }

    const checklists = await Checklist.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(checklists);
  } catch (err) {
    console.error('❌ Error fetching checklists:', err);
    res.status(500).json({ message: 'Error fetching checklists', error: err.message });
  }
});

// ✅ Update checklist items by ID
router.put('/:id', async (req, res) => {
  try {
    const { items } = req.body;
    const updated = await Checklist.findByIdAndUpdate(
      req.params.id,
      { items },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating checklist', error: err.message });
  }
});

// ✅ Delete a checklist by ID
router.delete('/:id', async (req, res) => {
  try {
    await Checklist.findByIdAndDelete(req.params.id);
    res.json({ message: 'Checklist deleted successfully' });
  } catch (err) {
    console.error('❌ Error deleting checklist:', err);
    res.status(500).json({ message: 'Error deleting checklist', error: err.message });
  }
});

module.exports = router;