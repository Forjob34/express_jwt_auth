require("dotenv").config();

const DB_URL = process.env.DB_URL;

module.exports = {
	DB_URL: DB_URL,
	dialect: "postgres",
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
};
