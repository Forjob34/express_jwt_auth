const dbConfig = require("../config/db_config");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB_URL, {
	dialect: dbConfig.dialect,

	pool: {
		max: dbConfig.pool.max,
		min: dbConfig.pool.min,
		acquire: dbConfig.pool.acquire,
		idle: dbConfig.pool.idle,
	},
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.token = require("./token.model.js")(sequelize, Sequelize);

module.exports = db;
