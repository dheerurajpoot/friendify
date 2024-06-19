import nodemailer from "nodemailer";

export const sendMail = async ({ email, emailType, userid }: any) => {
	try {
		const transporter = nodemailer.createTransport({
			host: "contact@dheeru.org",
			port: 587,
			secure: false,
			auth: {
				user: "maddison53@ethereal.email",
				pass: "jn7jnAPss4f63QBp6D",
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
			html: "<b>Hello world?</b>",
		};

		const mailResponse = await transporter.sendMail(mailOptions);
		return mailResponse;
	} catch (error: any) {
		throw new Error(error.message);
	}
};
