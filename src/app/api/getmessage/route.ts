import { connectDb } from "@/dbConfig/connectDb";
import { Message } from "@/model/message.model";
import { Chat } from "@/model/chat.model";
import { NextRequest, NextResponse } from "next/server";

connectDb();

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const conversationId = searchParams.get("conversationId");

	if (!conversationId) {
		return NextResponse.json(
			{ error: "Conversation ID is required" },
			{ status: 400 }
		);
	}

	try {
		// Find the conversation by ID
		const conversation = await Chat.findById(conversationId);
		if (!conversation) {
			return NextResponse.json(
				{ error: "Conversation not found" },
				{ status: 404 }
			);
		}

		// Find messages for the given conversation ID
		const messages = await Message.find({ conversationId }).sort({
			createdAt: 1,
		});

		return NextResponse.json({
			success: true,
			conversation,
			messages,
		});
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
