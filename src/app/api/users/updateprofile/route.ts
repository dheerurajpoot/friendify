import { connectDb } from "@/dbConfig/connectDb";
import { getTokenData } from "@/helpers/getTokenData";
import { User } from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";
connectDb();

export async function PUT(request: NextRequest) {
	const reqBody = await request.json();
	const userId = await getTokenData(request);
	const { name, username, email, profession, about, profilePhoto } = reqBody;
	const user = await User.findByIdAndUpdate(
		{ _id: userId },
		{
			name: name,
			username: username,
			email: email,
			profession: profession,
			profilepic: profilePhoto,
			about: about,
		}
	);
	if (!user) {
		return NextResponse.json({ error: "User not found" }, { status: 400 });
	}
	return NextResponse.json(
		{ error: "User profile found", data: user },
		{ status: 200 }
	);
}
