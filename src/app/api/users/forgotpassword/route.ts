import { connectDb } from "@/dbConfig/connectDb";
import { User } from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/helpers/mailer";

export async function POST(request: NextRequest) {
	try {
		await connectDb();
		const reqBody = await request.json();
		const { email } = reqBody;

		const user = await User.findOne({ email });
		if (!user) {
			return NextResponse.json(
				{ message: "User Not Found" },
				{ status: 409 }
			);
		}
		// send Reset password mail
		await sendMail({
			email,
			emailType: "RESET",
			userId: user?._id,
		});
		return NextResponse.json({
			message: "Link Sended Successfully",
			success: true,
		});
	} catch (error: any) {
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
