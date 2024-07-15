import { connectDb } from "@/dbConfig/connectDb";
import { log } from "console";
import { NextResponse } from "next/server";

connectDb();

// export async function GET() {
// 	try {
// 		const response = NextResponse.json({
// 			message: "Logout Successfully",
// 			success: true,
// 		});
// 		response.cookies.set("token", "", {
// 			httpOnly: true,
// 			expires: new Date(0),
// 			path: "/",
// 		});
// 		return response;
// 	} catch (error: any) {
// 		return NextResponse.json({ error: error.message }, { status: 500 });
// 	}
// }

export async function GET() {
	try {
		const response = new NextResponse(); // Create a new response object

		// Set the JSON response body
		// response.json({
		// 		message: "Logout Successfully",
		// 		success: true,
		// });

		// Set the cookie to expire immediately (by setting expiry to a date in the past)
		response.cookies.set("token", "", {
			httpOnly: true,
			expires: new Date(0),
			path: "/",
		});

		return response;
	} catch (error: any) {
		// Return an error response with status 500 if there's an error
		// return new NextResponse.json({ error: error.message }, { status: 500 });
		console.log(error);
	}
}
