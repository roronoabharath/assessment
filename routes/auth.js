const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models"); // make sure User is exported from models/index.js

// Load secret key from .env
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey123";

// POST /api/v1/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    // Update lastLogin
    user.lastLogin = new Date();
    await user.save();

    // Payload for JWT
    const payload = {
      id: user.id,
      roles: user.roles,
      name: user.name,
      email: user.email,
    };

    // Sign JWT
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, user: payload });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
