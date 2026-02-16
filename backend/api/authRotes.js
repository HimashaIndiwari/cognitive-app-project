const express = require('express');
const router = express.Router();
const User = require('../domain/User'); // Use the model we created
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTRATION ROUTE
router.post('/register', async (req, res) => {
  console.log('Register route hit:', req.body);
  try {
    const { name, email, password } = req.body;
    // Details are saved to MongoDB here
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    res.status(400).json({ error: "Email already exists or invalid data" });
  }
});

// LOGIN ROUTE
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

module.exports = router;