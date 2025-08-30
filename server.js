const express = require("express");
const app = express();
const db = require("./db"); // Sequelize instance

// Import models (optional if used elsewhere)
const { User, Role, AuditLog } = require("./models");

// Import routes
const authRoutes = require("./routes/auth");

// Middleware to parse JSON
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to Super Admin Backend 🚀");
});

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working fine ✅" });
});

// Mount auth routes under /api/v1/auth
app.use("/api/v1/auth", authRoutes);

// Sync DB and start server
const PORT = 5000;
db.sync({ force: false })
  .then(() => {
    console.log("Database & tables synced successfully!");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("Error syncing database:", err));
