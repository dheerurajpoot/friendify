import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { User } from "@/model/user.model";
import { verifyMailTemplate } from "./verifyMailTemplate";

export const sendMail = async ({ email, emailType, userId }: any) => {
	try {
		const token = jwt.sign(userId.toString(), "dheerurajpoot");

		if ((emailType = "VERIFY")) {
			await User.findByIdAndUpdate({
				verifyToken: token,
				verifyTokenExpiry: Date.now() + 3600000,
			});
		} else if ((emailType = "RESET")) {
			await User.findByIdAndUpdate({
				forgotPasswordToken: token,
				forgotPasswordTokenExpiry: Date.now() + 3600000,
			});
		}
		const transporter = nodemailer.createTransport({
			host: process.env.MAIL_SERVER,
			port: 2525,
			auth: {
				user: process.env.MAIL_USER,
				pass: process.env.MAIL_PASS,
			},
		});

		const mailOptions = {
			from: "contact@dheeru.org",
			to: email,
			subject:
				emailType === "VERIFY"
					? "Verify Your Email"
					: "Reset Password Link",
			text: "",
			html:
				emailType === "VERIFY"
					? verifyMailTemplate(token)
					: "<p>forgot password</p>",
		};

		const mailResponse = await transporter.sendMail(mailOptions);
		return mailResponse;
	} catch (error: any) {
		throw new Error(error.message);
	}
};
