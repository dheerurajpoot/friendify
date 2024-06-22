import { connectDb } from "@/dbConfig/connectDb";
import { User } from "@/model/user.model";
import { NextResponse } from "next/server";

connectDb();
export async function GET() {
	try {
		const users = await User.find();
		return NextResponse.json({
			message: "Users Found",
			success: true,
			users,
		});
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
