const jwt = require("jsonwebtoken");
const db = require("../models");
require("dotenv").config();

const Token = db.token;

class TokenService {
	generateTokens(payload) {
		const accessToken = jwt.sign(
			payload,
			process.env.JWT_ACCESS_SECRET_KEY,
			{
				expiresIn: "30m",
			}
		);
		const refreshToken = jwt.sign(
			payload,
			process.env.JWT_REFRESH_SECRET_KEY,
			{
				expiresIn: "30d",
			}
		);

		return {
			accessToken,
			refreshToken,
		};
	}

	async saveToken(id, refreshToken) {
		const tokenData = await Token.findOne({ where: { id } });
		console.log(tokenData);
		if (tokenData) {
			tokenData.refreshToken = refreshToken;
			console.log("ref token ----", refreshToken);
			return tokenData.save();
		}

		const token = await Token.create({
			id: id,
			refreshToken: refreshToken,
		});

		return token;
	}
}

module.exports = new TokenService();
