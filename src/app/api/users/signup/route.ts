import { connectDb } from "@/dbConfig/connectDb";
import { User } from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendMail } from "@/helpers/mailer";

export const revalidate = 0;
export async function POST(request: NextRequest) {
	try {
		await connectDb();
		const reqBody = await request.json();
		const { name, username, email, password } = reqBody;

		if (username.length < 4) {
			return NextResponse.json(
				{ message: "Username is too short! " },
				{ status: 409 }
			);
		}
		const user = await User.findOne({ email });

		if (user) {
			return NextResponse.json(
				{ message: "Account already exist with this Email!" },
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
		await sendMail({
			email,
			emailType: "VERIFY",
			userId: savedUser._id,
		});

		return NextResponse.json({
			message: "Account Created Successfully",
			success: true,
			savedUser,
		});
	} catch (error: any) {
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
