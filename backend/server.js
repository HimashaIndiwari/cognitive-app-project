const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db'); // Now this path is correct

dotenv.config();
connectDB(); // You MUST call this to connect to MongoDB

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Cognitive App Backend is Running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));