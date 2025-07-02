const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Signup Route – for patients only
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create new patient user
    const newUser = new User({
      name,
      email,
      password,
      role: "patient", // force role as patient
    });

    await newUser.save();

    res.status(201).json({
      message: "Signup successful",
      user: { name, email, role: "patient" },
    });
  } catch (err) {
    res.status(500).json({ error: "Signup failed" });
  }
});

// Login Route – for both roles
router.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = await User.findOne({ email });

    if (!user || user.role !== role) {
      return res.status(401).json({ error: "Invalid credentials or role" });
    }

    // Plain text password check
    if (user.password !== password) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    res.json({
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;
