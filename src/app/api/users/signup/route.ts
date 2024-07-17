import { connectDb } from "@/dbConfig/connectDb";
import { User } from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendMail } from "@/helpers/mailer";
connectDb();

export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json();
		const { name, username, email, password } = reqBody;

		const user = await User.findOne({ email });

		if (user) {
			return NextResponse.json(
				{ message: "Account already exist with this Email" },
				{ status: 409 }
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
		const res = await sendMail({
			email,
			emailType: "VERIFY",
			userId: savedUser._id,
		});
		console.log(res);

		return NextResponse.json({
			message: "Account Created Successfully",
			success: true,
			savedUser,
		});
	} catch (error: any) {
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
