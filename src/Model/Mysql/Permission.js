const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/mysql");

const Permission = sequelize.define(
	"Permission",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		tableName: "permissions",
		timestamps: true,
	}
);

module.exports = Permission;