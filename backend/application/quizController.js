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
// Handle Memory & Mobility Quiz Submission
exports.submitMemoryQuiz = async (req, res) => {
  try {
    const { memoryAnswer, mobilityAnswer } = req.body;
    const userId = req.user.id;

    // --- MEMORY LOGIC ---
    let memoryLevel = 1;
    let memoryTitle = "High Support Needed";
    let memoryTasks = [];

    if (memoryAnswer === 'A') {
      memoryLevel = 3;
      memoryTitle = "Independent Mind";
      memoryTasks = [
        "Complete a 15-minute morning walk",
        "Read a chapter of a book",
        "Solve a crossword puzzle"
      ];
    } else if (memoryAnswer === 'B') {
      memoryLevel = 2;
      memoryTitle = "Mild Cognitive Decline";
      memoryTasks = [
        "Review calendar for appointments",
        "Organize medications for the day",
        "Call a friend or family member"
      ];
    } else {
      // C or D
      memoryLevel = 1;
      memoryTitle = "High Support Needed";
      memoryTasks = [
        "Listen to calming music",
        "Engage in guided conversation",
        "Look at family photo album"
      ];
    }

    // --- MOBILITY LOGIC ---
    let mobilityLevel = 1;
    let mobilityTitle = "Limited Mobility";
    let mobilityTasks = [];

    if (mobilityAnswer === 'A') {
      mobilityLevel = 3;
      mobilityTitle = "Strong Mobility";
      mobilityTasks = [
        "Activity: 30-Minute Outdoor Walk",
        "Action: Walk at a comfortable pace for 30 minutes",
        "Purpose: Improve circulation, Oxygen to brain, Support cognitive function"
      ];
    } else if (mobilityAnswer === 'B') {
      mobilityLevel = 2;
      mobilityTitle = "Moderate Mobility";
      mobilityTasks = [
        "Activity: 10-Minute Walk + 5-Minute Rest (Repeat Once)",
        "Action: Walk 10 min → Rest 5 min → Walk again",
        "Purpose: Maintain stamina, Avoid overexertion, Improve strength"
      ];
    } else if (mobilityAnswer === 'C') {
      mobilityLevel = 1;
      mobilityTitle = "Low Mobility";
      mobilityTasks = [
        "Activity: Indoor Walking Between Rooms (5–10 Mins)",
        "Action: Slow walking inside house (living room to kitchen)",
        "Purpose: Prevent stiffness, Safe movement, Light activity"
      ];
    } else {
      // D
      mobilityLevel = 1;
      mobilityTitle = "High Support Level – Limited Mobility";
      mobilityTasks = [
        "Activity: Seated Chair Yoga (5–10 Minutes)",
        "Action: Simple movements: Arm raises, Neck rotations, Deep breathing",
        "Purpose: Improve flexibility, Reduce stiffness, Promote relaxation"
      ];
    }

    // --- SOCIAL LOGIC ---
    const { socialAnswer } = req.body;
    let socialLevel = 1;
    let socialTitle = "Socially Isolated";
    let socialTasks = [];

    if (socialAnswer === 'A') {
      socialLevel = 3;
      socialTitle = "🟢 Level 3 – Highly Social";
      socialTasks = [
        "Activity: 🗣 Join a Group Conversation or Community Activity (30 mins)",
        "Action: Participate in a temple group, community meeting, or group chat",
        "Purpose: Maintain strong communication skills, Boost confidence, Prevent loneliness"
      ];
    } else if (socialAnswer === 'B') {
      socialLevel = 2;
      socialTitle = "🟡 Level 2 – Moderately Social";
      socialTasks = [
        "Activity: 📞 Call or Visit One Friend This Week",
        "Action: Make one scheduled phone call to a friend or neighbor",
        "Purpose: Maintain social bonds, Encourage regular communication"
      ];
    } else if (socialAnswer === 'C') {
      socialLevel = 1;
      socialTitle = "🟠 Level 1 – Low Social Interaction";
      socialTasks = [
        "Activity: 💬 Talk for 10 Minutes with a Family Member",
        "Action: Have a short conversation at home about daily events",
        "Purpose: Improve emotional connection, Reduce isolation"
      ];
    } else {
      // D or undefined
      socialLevel = 1;
      socialTitle = "🔴 High Support – Isolated";
      socialTasks = [
        "Activity: 📱 Scheduled “Call Family” Reminder (With Support)",
        "Action: System sends reminder: “Call your daughter at 5 PM.”",
        "Purpose: Reduce loneliness, Improve emotional well-being, Increase sense of connection"
      ];
    }

    // Construct the Combined Plan
    const plan = {
      date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      memory: {
        level: memoryLevel,
        title: `Daily Orientation - Level ${memoryLevel}`,
        subtitle: memoryTitle,
        tasks: memoryTasks,
        color: "bg-blue-900"
      },
      mobility: {
        level: mobilityLevel,
        title: "Daily Fitness & Health Hub",
        subtitle: `Support Level: ${mobilityTitle}`,
        tasks: mobilityTasks,
        color: "bg-slate-900"
      },
      social: {
        level: socialLevel,
        title: "Daily Social Connection",
        subtitle: `Social Level: ${socialTitle}`,
        tasks: socialTasks,
        color: "bg-purple-900"
      }
    };

    // Update User's Levels
    await User.findByIdAndUpdate(userId, {
      'levels.memory': memoryLevel,
      'levels.mobility': mobilityLevel,
      'levels.social': socialLevel
    });

    res.status(200).json({ success: true, plan });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server failed to process assessment" });
  }
};