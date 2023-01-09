const jwt = require("jsonwebtoken");
require("dotenv").config();

SECRET_KEY = process.env.SECRET_KEY;

module.exports = function (is_role) {
	return function (req, res, next) {
		if (req.method === "OPTIONS") {
			next();
		}

		try {
			const token = req.headers.authorization.split(" ")[1];
			if (!token) {
				res.status(403).json({ massage: "the user is not authorized" });
			}
			const { is_role: userRoles } = jwt.verify(token, SECRET_KEY);
			let hasRole = false;
			if (userRoles == is_role) {
				hasRole = true;
			}
			if (!hasRole) {
				return res
					.status(403)
					.json({ message: "you don't have access" });
			}
			next();
		} catch (error) {
			console.log(error);
			res.status(403).json({ massage: "the user is not authorized" });
		}
	};
};
