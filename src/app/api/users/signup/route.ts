import { connectDb } from "@/dbConfig/connectDb";
import { User } from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendMail } from "@/helpers/mailer";
connectDb();

export async function POST(reqest: NextRequest) {
	try {
		const reqBody = await reqest.json();
		const { name, username, email, password } = reqBody;

		const user = await User.findOne({ email });
		if (user) {
			return NextResponse.json(
				{ error: "User already exists" },
				{ status: 400 }
			);
		}
		const salt = await bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(password, salt);
		const newUser = new User({
			name,
			username,
			email,
			password: hashedPassword,
		});
		const savedUser = await newUser.save();

		// send verification mail
		await sendMail({ email, emailType: "VERIFY", userId: savedUser._id });
		return NextResponse.json({
			message: "Account Created Successfully",
			success: true,
			savedUser,
		});
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
