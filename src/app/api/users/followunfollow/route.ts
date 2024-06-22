import { connectDb } from "@/dbConfig/connectDb";
import { getTokenData } from "@/helpers/getTokenData";
import { User } from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";

connectDb();

export async function PUT(request: NextRequest) {
	try {
		const userId = await getTokenData(request);
		const reqBody = await request.json();
		const { id } = reqBody;

		if (!userId || !id) {
			return NextResponse.json(
				{ error: "Invalid request data" },
				{ status: 400 }
			);
		}

		const loggedUser = await User.findById(userId);
		const user = await User.findById(id);

		if (!user || !loggedUser) {
			return NextResponse.json(
				{ error: "User not found" },
				{ status: 404 }
			);
		}

		if (!user.followers.includes(userId)) {
			user.followers.push(userId);
			loggedUser.following.push(id);
			await user.save();
			await loggedUser.save();
			return NextResponse.json({
				message: "Followed",
				success: true,
			});
		} else {
			user.followers.pull(userId);
			loggedUser.following.pull(id);
			await user.save();
			await loggedUser.save();
			return NextResponse.json({
				message: "Unfollowed",
				success: true,
			});
		}
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
