import { connectDb } from "@/dbConfig/connectDb";
import { User } from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";
export const revalidate = 0;

export async function POST(request: NextRequest) {
	try {
		await connectDb();
		const reqBody = await request.json();
		const { userId } = reqBody;
		if (!userId) {
			return NextResponse.json(
				{ message: "User ID is required" },
				{ status: 400 }
			);
		}
		const user = await User.findById(userId).select("-password");
		if (!user) {
			return NextResponse.json(
				{ message: "User not found" },
				{ status: 404 }
			);
		}
		const followers = await User.find({
			_id: { $in: user.followers },
		}).select("name username profilepic");
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
