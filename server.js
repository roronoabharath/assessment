const express = require("express");
const app = express();

// Middleware to read JSON data
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to AI Resume Analyzer Backend 🚀");
});

// Test API route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working fine ✅" });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
