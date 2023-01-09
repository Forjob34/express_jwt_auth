const nodemailer = require("nodemailer");
require("dotenv").config();

class MailService {
	constructor() {
		this.transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: process.env.SMTP_HOST,
			secure: false,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASSWORD_APP,
			},
		});
	}

	async sendActivationMail(to, link) {
		await this.transporter.sendMail({
			from: process.env.SMTP_USER,
			to,
			subject: "Activation link on " + process.env.API_URL,
			text: "",
			html: `
					<div>
						<h1> Click link for activation </h1>
						<a href="${link}">${link}</a>
					</div>

				`,
		});
	}
}

module.exports = new MailService();
