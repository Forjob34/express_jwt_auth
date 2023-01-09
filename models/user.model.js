const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define(
		"user",
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			email: {
				type: DataTypes.TEXT,
			},
			name: {
				type: DataTypes.TEXT,
			},
			hashed_password: {
				type: DataTypes.CHAR,
			},
			is_company: {
				type: DataTypes.BOOLEAN,
				defaultValue: "false",
			},
			created_at: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
			},
			updated_at: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
			},
			is_role: {
				type: DataTypes.BOOLEAN,
				defaultValue: "user",
			},
			activationLink: {
				type: DataTypes.STRING,
			},
			is_activate: {
				type: DataTypes.BOOLEAN,
				defaultValue: "false",
			},
		},
		{ timestamps: false }
	);

	return User;
};
