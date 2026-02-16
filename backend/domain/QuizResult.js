const mongoose = require('mongoose');

// Schema for storing assessment levels (1-3) based on user answers
const QuizResultSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  scores: {
    memory: { type: Number, required: true }, // Level 1, 2, or 3
    mobility: { type: Number, required: true },
    social: { type: Number, required: true },
    focus: { type: Number, required: true },
    independence: { type: Number, required: true }
  },
  overallLevel: { type: Number, default: 1 },
  completedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('QuizResult', QuizResultSchema);