const db = require("../models");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const mailService = require("./mail.service");
const tokenService = require("./token.service");
const UserDto = require("../dto/user.dto");
require("dotenv").config();

const User = db.user;

class UserService {
	async registration(email, password) {
		try {
			const candidate = await User.findOne({ where: { email } });

			if (candidate) {
				throw new Error(`the email ${email} already exists`);
			}

			const hashPassword = bcrypt.hashSync(password, 9);
			const activationLink = uuid.v4();

			const newUser = await User.create({
				email: email,
				hashed_password: hashPassword,
				activationLink: activationLink,
			});

			await mailService.sendActivationMail(
				email,
				`${process.env.API_URL}/api/activate/${activationLink}`
			);
			const userDto = new UserDto(newUser);
			console.log(userDto);
			const tokens = tokenService.generateTokens({ ...userDto });

			await tokenService.saveToken(userDto.id, tokens.refreshToken);

			return {
				...tokens,
				newUser: userDto,
			};
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = new UserService();
