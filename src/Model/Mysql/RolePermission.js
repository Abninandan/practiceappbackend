const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/mysql");

const RolePermission = sequelize.define(
	"RolePermission",
	{
		roleId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			references: { model: "roles", key: "id" },
			onDelete: "CASCADE",
			onUpdate: "CASCADE",
		},
		permissionId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			references: { model: "permissions", key: "id" },
			onDelete: "CASCADE",
			onUpdate: "CASCADE",
		},
	},
	{
		tableName: "role_permissions",
		timestamps: true,
	}
);

module.exports = RolePermission;