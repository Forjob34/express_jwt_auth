const bcrypt = require("bcryptjs");
const db = require("../models");
const { validationResult } = require("express-validator");
const userService = require("../services/user.service");
require("dotenv").config();

const User = db.user;

class authController {
	async registration(req, res) {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({ message: errors });
			}

			const { email, password } = req.body;
			const userData = await userService.registration(email, password);
			res.cookie("refreshToken", userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			return res.json(userData);
		} catch (error) {
			console.log(error);
			res.status(400).json({ message: "Registration error" });
		}
	}

	async login(req, res) {
		try {
			const { email, password } = req.body;
			const user = await User.findOne({ where: { email } });

			if (!user) {
				return res
					.status(200)
					.json({ message: `User ${email} not finded` });
			}
			const validPassword = bcrypt.compareSync(
				password,
				user.hashed_password
			);
			if (!validPassword) {
				return res.status(200).json({ message: "incorrect password" });
			}
			const token = generateAccessToken(user._id, user.is_role);
			return res.json({ token });
		} catch (error) {
			console.log(error);
			res.status(400).json({ message: "Login error" });
		}
	}

	async getUsers(req, res) {
		try {
			const users = await User.findAll();
			res.json(users);
		} catch (error) {
			console.log(error);
		}
	}

	async getUsersById(req, res) {
		try {
			const id = parseInt(req.params.id);
			const user = await User.findByPk(id);
			res.json(user);
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = new authController();
