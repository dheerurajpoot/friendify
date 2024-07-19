import { connectDb } from "@/dbConfig/connectDb";
import { NextResponse } from "next/server";

export const revalidate = 0;
export async function GET() {
	try {
		await connectDb();
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
