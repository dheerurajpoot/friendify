import { connectDb } from "@/dbConfig/connectDb";
import { User } from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";
connectDb();

export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json();
		const { token } = reqBody;
		console.log(token);
		const user = await User.findOne({
			verifyToken: token,
			verifyTokenExpiry: { $gt: Date.now() },
		});
		if (!user) {
			return NextResponse.json(
				{ error: "Invalid Token" },
				{ status: 500 }
			);
		}
		console.log(user);

		user.isVerified = true;
		user.verifyToken = "";
		user.verifyTokenExpiry = "";

		await user.save();

		return NextResponse.json(
			{
				message: "Email Verification Successfull",
				success: true,
			},
			{ status: 500 }
		);
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
