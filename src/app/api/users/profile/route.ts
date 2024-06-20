import { connectDb } from "@/dbConfig/connectDb";
import { getTokenData } from "@/helpers/getTokenData";
import { User } from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";
connectDb();

export async function POST(request: NextRequest) {
	const userId = await getTokenData(request);
	const user = await User.findOne({ _id: userId }).select("-password");
	if (!user) {
		return NextResponse.json({ error: "User not found" }, { status: 400 });
	}
	return NextResponse.json(
		{ error: "User profile found", data: user },
		{ status: 200 }
	);
}
