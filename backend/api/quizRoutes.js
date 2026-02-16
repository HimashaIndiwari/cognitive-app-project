const express = require('express');
const router = express.Router();
const { saveQuizResult, submitMemoryQuiz } = require('../application/quizController');
const { protect } = require('../middleware/authMiddleware'); // Protected route

// Secure endpoint for quiz data
router.post('/submit', protect, saveQuizResult);
router.post('/memory-quiz', protect, submitMemoryQuiz);

module.exports = router;