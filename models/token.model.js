const { DataTypes } = require("sequelize");
const User = require("./user.model");

module.exports = (sequelize, Sequelize) => {
	const Token = sequelize.define(
		"token",
		{
			id: {
				type: DataTypes.INTEGER,
				references: {
					model: User,
					key: "id",
				},
				primaryKey: true,
			},
			refreshToken: {
				type: DataTypes.STRING,
				require: true,
			},
		},
		{ timestamps: false }
	);

	return Token;
};
