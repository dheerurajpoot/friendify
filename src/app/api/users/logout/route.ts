import { connectDb } from "@/dbConfig/connectDb";
import { log } from "console";
import { NextResponse } from "next/server";

connectDb();

export async function GET() {
	try {
		const response = new NextResponse();

		response.cookies.set("token", "", {
			httpOnly: true,
			expires: new Date(0),
			path: "/",
		});

		return response;
	} catch (error: any) {
		console.log(error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
