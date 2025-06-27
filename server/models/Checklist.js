const mongoose = require('mongoose');

const checklistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tripName: String,
  destination: String,
  tripType: String,
  date: String,
  travelers: Number,
  items: [
    {
      label: String,
      checked: { type: Boolean, default: false }
    }
  ],
}, { timestamps: true });

module.exports = mongoose.model('Checklist', checklistSchema);
