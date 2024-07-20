import { connectDb } from "@/dbConfig/connectDb";
import { User } from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;
export async function POST(request: NextRequest) {
	try {
		await connectDb();
		const reqBody = await request.json();
		const { userId } = reqBody;

		const user = await User.findOne({ _id: userId }).select("-password");
		if (!user) {
			return NextResponse.json(
				{ message: "User not found" },
				{ status: 400 }
			);
		}
		return NextResponse.json(
			{ message: "User profile found", data: user },
			{ status: 200 }
		);
	} catch (error: any) {
		console.log(error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
