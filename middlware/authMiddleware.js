const jwt = require("jsonwebtoken");
require("dotenv").config();

SECRET_KEY = process.env.SECRET_KEY;

module.exports = function (req, res, next) {
	if (req.method === "OPTIONS") {
		next();
	}

	try {
		const token = req.headers.authorization.split(" ")[1];
		if (!token) {
			res.status(403).json({ massage: "the user is not authorized" });
		}
		const decodedData = jwt.verify(token, SECRET_KEY);
		req.user = decodedData;
		next();
	} catch (error) {
		console.log(error);
		res.status(403).json({ massage: "the user is not authorized" });
	}
};
