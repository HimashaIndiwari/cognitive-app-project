const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./infrastructure/db'); // Now this path is correct
const authRoutes = require('./api/authRotes');
dotenv.config();
connectDB(); // You MUST call this to connect to MongoDB

const app = express();
app.use(express.json());
app.use(cors());

// Debugging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});
app.use('/api/auth', require('./api/authRotes'));
app.use('/api/quiz', require('./api/quizRoutes'));

app.get('/', (req, res) => {
  res.send('Cognitive App Backend is Running! (Patched)');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));