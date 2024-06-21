import { connectDb } from "@/dbConfig/connectDb";
import { User } from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";
connectDb();

export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json();
		const { token } = reqBody;
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

		user.isVerified = true;
		user.verifyToken = "";
		user.verifyTokenExpiry = "";

		await user.save();
		return NextResponse.json(
			{
				message: "Email Verification Successfull",
				success: true,
			},
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
