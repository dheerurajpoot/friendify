import { connectDb } from "@/dbConfig/connectDb";
import { Message } from "@/model/message.model";
import { Chat } from "@/model/chat.model";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;
export async function GET(request: NextRequest) {
	try {
		await connectDb();
		const { searchParams } = new URL(request.url);
		const conversationId = searchParams.get("conversationId");

		if (!conversationId) {
			return NextResponse.json(
				{ message: "Conversation ID is required" },
				{ status: 400 }
			);
		}
		// Find the conversation by ID
		const conversation = await Chat.findById(conversationId);
		if (!conversation) {
			return NextResponse.json(
				{ message: "Conversation not found" },
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
