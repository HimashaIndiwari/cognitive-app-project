const QuizResult = require('../domain/QuizResult');

// Handles saving quiz data to MongoDB
exports.saveQuizResult = async (req, res) => {
  try {
    const { scores } = req.body;
    // req.user.id is populated by your auth middleware
    const userId = req.user.id; 

    // Calculate overall level based on average of 5 questions
    const values = Object.values(scores);
    const average = Math.round(values.reduce((a, b) => a + b, 0) / values.length);

    const result = await QuizResult.create({
      user: userId,
      scores,
      overallLevel: average
    });

    res.status(201).json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ error: "Server failed to save results" });
  }
};