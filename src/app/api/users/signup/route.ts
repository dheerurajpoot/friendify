import { connectDb } from "@/dbConfig/connectDb";
import { User } from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";

connectDb();

export async function POST(reqest: NextRequest) {
	try {
		const reqBody = reqest.json();
		const { name, username, email, password } = reqBody;

		const user = await User.findOne({ email });
		if (user) {
			return NextResponse.json(
				{ error: "User already exists" },
				{ status: 400 }
			);
		}
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
