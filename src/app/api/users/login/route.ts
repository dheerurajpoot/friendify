import { connectDb } from "@/dbConfig/connectDb";
import { User } from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const revalidate = 0;
export async function POST(request: NextRequest) {
	try {
		await connectDb();
		const reqBody = await request.json();
		const { email, password } = reqBody;

		const user = await User.findOne({ email });
		if (!user) {
			return NextResponse.json(
				{ message: "User does not exist with this email" },
				{ status: 400 }
			);
		}
		if (!user.isVerified) {
			return NextResponse.json(
				{ message: "Please verify your email first!" },
				{ status: 400 }
			);
		}
		const isValid = await bcryptjs.compare(password, user.password);
		if (!isValid) {
			return NextResponse.json(
				{ message: "Email or Password is incorrected" },
				{ status: 400 }
			);
		}
		const tokenData = {
			id: user._id,
			username: user.username,
		};
		const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
			expiresIn: "15d",
		});

		const response = NextResponse.json({
			message: "Login Successfully",
			success: true,
			user,
		});
		response.cookies.set("token", token, {
			httpOnly: true,
		});
		return response;
	} catch (error: any) {
		console.log(error);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
