import { connectDb } from "@/dbConfig/connectDb";
import { Chat } from "@/model/chat.model";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;
export async function POST(request: NextRequest) {
	try {
		await connectDb();
		const { userId1, userId2 } = await request.json();
		const existingConversation = await Chat.findOne({
			participants: { $all: [userId1, userId2] },
		});

		if (existingConversation) {
			return NextResponse.json({
				message: "Conversation already exists",
				success: true,
				conversation: existingConversation,
			});
		}
		const conversation = new Chat({
			participants: [userId1, userId2],
		});

		await conversation.save();

		return NextResponse.json({
			message: "Conversation created successfully",
			success: true,
			conversation,
		});
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
