const QuizResult = require('../domain/QuizResult');
const User = require('../domain/User');

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

// Handle Memory Quiz Submission
exports.submitMemoryQuiz = async (req, res) => {
  try {
    const { answer } = req.body;
    const userId = req.user.id;

    let memoryLevel = 1;
    let plan = {};

    // Determine Level based on Answer
    // A -> Level 3 (Independent)
    // B -> Level 2 (Assisted)
    // C or D -> Level 1 (Supported)
    if (answer === 'A') {
      memoryLevel = 3;
      plan = {
        title: "Independent Daily Check",
        description: "You are doing great! engaging in these activities will help maintain your cognitive health.",
        tasks: [
          "Complete a 15-minute morning walk",
          "Read a chapter of a book",
          "Solve a crossword puzzle",
          "Prepare a healthy meal"
        ],
        date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
      };
    } else if (answer === 'B') {
      memoryLevel = 2;
      plan = {
        title: "Assisted Daily Check",
        description: "A little help goes a long way. Let's stick to a routine.",
        tasks: [
          "Review calendar for appointments",
          "Organize medications for the day",
          "Light stretching exercises",
          "Call a friend or family member"
        ],
        date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
      };
    } else {
      // Covers 'C' and 'D'
      memoryLevel = 1;
      plan = {
        title: "Supported Daily Routine",
        description: "We are here to support you. Focus on simple, guided tasks.",
        tasks: [
          "Follow guided morning routine",
          "Assisted medication intake",
          "Listen to calming music",
          "Engage in guided conversation"
        ],
        date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
      };
    }

    // Update User's Memory Level
    await User.findByIdAndUpdate(userId, {
      'levels.memory': memoryLevel
    });

    res.status(200).json({ success: true, level: memoryLevel, plan });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server failed to process memory quiz" });
  }
};