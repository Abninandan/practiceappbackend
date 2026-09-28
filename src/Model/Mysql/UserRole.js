const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/mysql");

const UserRole = sequelize.define(
	"UserRole",
	{
		userId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			references: { model: "users", key: "id" },
			onDelete: "CASCADE",
			onUpdate: "CASCADE",
		},
		roleId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			references: { model: "roles", key: "id" },
			onDelete: "CASCADE",
			onUpdate: "CASCADE",
		},
	},
	{
		tableName: "user_roles",
		timestamps: true,
	}
);

module.exports = UserRole;