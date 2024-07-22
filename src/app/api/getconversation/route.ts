import { connectDb } from "@/dbConfig/connectDb";
import { Chat } from "@/model/chat.model";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;
export async function POST(request: NextRequest) {
	try {
		await connectDb();
		const { userId } = await request.json();
		const conversation = await Chat.find({
			participants: { $in: userId },
		});

		if (!conversation) {
			return NextResponse.json({
				message: "Conversation not found!",
				success: false,
			});
		}

		return NextResponse.json({
			message: "Conversation Found!",
			success: true,
			conversation,
		});
	} catch (error: any) {
		console.log(error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
