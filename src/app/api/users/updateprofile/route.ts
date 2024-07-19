import { connectDb } from "@/dbConfig/connectDb";
import { getTokenData } from "@/helpers/getTokenData";
import { User } from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;
export async function PUT(request: NextRequest) {
	try {
		await connectDb();
		const reqBody = await request.json();
		const userId = await getTokenData(request);
		const { name, username, email, profession, about, profilePhoto } =
			reqBody;
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
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
