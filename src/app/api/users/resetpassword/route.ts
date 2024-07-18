import { connectDb } from "@/dbConfig/connectDb";
import { User } from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function PUT(request: NextRequest) {
	try {
		await connectDb();
		const reqBody = await request.json();
		const { token, newPassword } = reqBody;
		const user = await User.findOne({
			forgotPasswordToken: token,
			forgotPasswordTokenExpiry: { $gt: Date.now() },
		});

		if (!user) {
			return NextResponse.json(
				{ message: "Invalid Token" },
				{ status: 500 }
			);
		}
		const salt = await bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(newPassword, salt);

		await user.updateOne({
			$set: { password: hashedPassword },
			$unset: { forgotPasswordToken: "", forgotPasswordTokenExpiry: "" },
		});

		return NextResponse.json(
			{
				message: "Password Reset Successfully",
				success: true,
			},
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
