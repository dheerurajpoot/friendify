import { connectDb } from "@/dbConfig/connectDb";
import { User } from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";
connectDb();

export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json();
		const { userId } = reqBody;

		if (!userId) {
			return NextResponse.json(
				{ error: "User ID is required" },
				{ status: 400 }
			);
		}

		const user = await User.findById(userId).select("-password");
		if (!user) {
			return NextResponse.json(
				{ error: "User not found" },
				{ status: 404 }
			);
		}

		const followers = await User.find({
			_id: { $in: user.followers },
		}).select("name profilepic");
		const following = await User.find({
			_id: { $in: user.following },
		}).select("name username profilepic");

		return NextResponse.json(
			{
				message: "User profile found",
				data: { followers, following },
			},
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
