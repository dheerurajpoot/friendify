import { connectDb } from "@/dbConfig/connectDb";
import { NextResponse } from "next/server";

connectDb();

export async function POST() {
	try {
		const response = NextResponse.json({
			message: "Logout Successfully",
			success: true,
		});
		response.cookies.set("token", "", {
			httpOnly: true,
			expires: new Date(0),
		});
		return response;
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}