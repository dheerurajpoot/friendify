import { connectDb } from "@/dbConfig/connectDb";
import { User } from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	try {
		await connectDb();
		const { username } = await req.json();

		const user = await User.findOne({ username });
		if (username.length < 4) {
			return NextResponse.json({
				message: "Username is too short! ",
				success: false,
			});
		}
		if (user) {
			return NextResponse.json({
				isUnique: false,
				message: "Username already taken!",
				success: false,
			});
		}
		if (!user) {
			return NextResponse.json({
				isUnique: true,
				message: "Username available!",
				success: true,
			});
		}
	} catch (error: any) {
		console.log(error);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
