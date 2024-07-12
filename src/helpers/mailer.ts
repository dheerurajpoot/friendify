import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { User } from "@/model/user.model";
import { verifyMailTemplate } from "./verifyMailTemplate";

export const sendMail = async ({ email, emailType, userId }: any) => {
	try {
		const token = jwt.sign({ userId: userId }, process.env.TOKEN_SECRET!);

		if (emailType === "VERIFY") {
			await User.findByIdAndUpdate(userId, {
				$set: {
					verifyToken: token,
					verifyTokenExpiry: Date.now() + 3600000, // 1 hour
				},
			});
		} else if (emailType === "RESET") {
			await User.findByIdAndUpdate(userId, {
				$set: {
					forgotPasswordToken: token,
					forgotPasswordTokenExpiry: Date.now() + 3600000, // 1 hour
				},
			});
		}

		const transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			port: 587,
			secure: false,
			auth: {
				user: process.env.MAIL_USER,
				pass: process.env.MAIL_PASS,
			},
		});

		const mailOptions = {
			from: '"HikeTok ✅" <drexpress90@gmail.com>',
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
		throw new Error(`Error sending email: ${error.message}`);
	}
};
