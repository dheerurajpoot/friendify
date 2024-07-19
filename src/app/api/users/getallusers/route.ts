import { connectDb } from "@/dbConfig/connectDb";
import { User } from "@/model/user.model";
import { NextResponse } from "next/server";
export const revalidate = 0;

export async function GET() {
	try {
		await connectDb();
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
