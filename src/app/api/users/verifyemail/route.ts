import { connectDb } from "@/dbConfig/connectDb";
import { User } from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		await connectDb();
		const reqBody = await request.json();
		const { token } = reqBody;
		const user = await User.findOne({
			verifyToken: token,
			verifyTokenExpiry: { $gt: Date.now() },
		});

		if (!user) {
			return NextResponse.json(
				{ message: "Invalid Token" },
				{ status: 500 }
			);
		}

		await user.updateOne({
			$set: { isVerified: true },
			$unset: { verifyToken: "", verifyTokenExpiry: "" },
		});

		return NextResponse.json(
			{
				message: "Email Verification Successful",
				success: true,
			},
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
