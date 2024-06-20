import { connectDb } from "@/dbConfig/connectDb";
import { User } from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
connectDb();

export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json();
		const { email, password } = reqBody;
		const user = await User.findOne({ email });
		if (!user) {
			return NextResponse.json(
				{ error: "User does not exist" },
				{ status: 400 }
			);
		}
		console.log(user);
		const isValid = await bcryptjs.compare(password, user.password);
		if (!isValid) {
			return NextResponse.json(
				{ error: "Email or Password is incorrected" },
				{ status: 400 }
			);
		}
		const tokenData = {
			id: user._id,
			username: user.username,
		};
		const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
			expiresIn: "1d",
		});

		const response = NextResponse.json({
			message: "Login Successfully",
			success: true,
		});
		response.cookies.set("token", token, {
			httpOnly: true,
		});
		return response;
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
