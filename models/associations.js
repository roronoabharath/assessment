const User = require("./User");
const Role = require("./Role");
const AuditLog = require("./AuditLog");

// Many-to-Many: Users <-> Roles
User.belongsToMany(Role, { through: "UserRoles" });
Role.belongsToMany(User, { through: "UserRoles" });

// One-to-Many: User -> AuditLog
User.hasMany(AuditLog, { foreignKey: "actorUserId" });
AuditLog.belongsTo(User, { foreignKey: "actorUserId" });

module.exports = {
  User,
  Role,
  AuditLog,
};
