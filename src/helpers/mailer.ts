import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { User } from "@/model/user.model";
import { emailBody } from "./verifyMailTemplate";
import { forgotMailTemplate } from "./forgotMailTemplate";

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
			port: 465,
			secure: true,
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
					? emailBody(token)
					: forgotMailTemplate(token),
		};

		const mailResponse = await transporter.sendMail(mailOptions);
		return mailResponse;
	} catch (error: any) {
		throw new Error(`Error sending email: ${error.message}`);
	}
};
