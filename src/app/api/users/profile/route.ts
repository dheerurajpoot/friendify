import { connectDb } from "@/dbConfig/connectDb";
import { User } from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		await connectDb();
		const reqBody = await request.json();
		const { userId } = reqBody;
		const user = await User.findOne({ _id: userId }).select("-password");
		if (!user) {
			return NextResponse.json(
				{ error: "User not found" },
				{ status: 400 }
			);
		}
		return NextResponse.json(
			{ error: "User profile found", data: user },
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
