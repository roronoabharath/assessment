const bcrypt = require("bcryptjs");
const db = require("./db");
const User = require("./models/User");
const Role = require("./models/Role");
const AuditLog = require("./models/AuditLog");

async function seed() {
  try {
    // Sync each model individually in order
    await Role.sync({ force: true });    // Roles first
    await User.sync({ force: true });    // Users next
    await AuditLog.sync({ force: true }); // Audit logs last

    // Create roles
    const superadminRole = await Role.create({ name: "superadmin", permissions: ["all"] });
    const userRole = await Role.create({ name: "user", permissions: ["read"] });

    // Create test superadmin
    const hashedPassword = await bcrypt.hash("Test1234!", 10);
    await User.create({
      name: "Super Admin",
      email: "superadmin@example.com",
      hashedPassword,
      roles: ["superadmin"],
    });

    console.log("✅ Database seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
}

seed();
