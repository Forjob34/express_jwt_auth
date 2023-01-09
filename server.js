const express = require("express");
const authRouter = require("./routes/authRouter");
const db = require("./models");
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/auth", authRouter);

const start = async () => {
	try {
		app.listen(PORT, () => {
			console.log(`server start on ${PORT} port`);
		});
	} catch (e) {
		console.log(e);
	}
};

const dbConn = async () => {
	try {
		await db.sequelize.authenticate();
		console.log("Connection has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
};

start();
dbConn();
