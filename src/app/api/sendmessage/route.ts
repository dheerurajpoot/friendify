import { connectDb } from "@/dbConfig/connectDb";
import { Message } from "@/model/message.model";
import { Chat } from "@/model/chat.model";
import { NextRequest, NextResponse } from "next/server";

connectDb();

export async function POST(request: NextRequest) {
	try {
		const { sender, receiver, content, conversationId } =
			await request.json();

		if (!sender || !receiver || !content || !conversationId) {
			return NextResponse.json(
				{ error: "All fields are required" },
				{ status: 400 }
			);
		}

		const conversation = await Chat.findById(conversationId);
		if (!conversation) {
			return NextResponse.json(
				{ error: "Conversation not found" },
				{ status: 404 }
			);
		}

		const newMessage = new Message({
			sender,
			receiver,
			content,
			conversationId,
		});

		await newMessage.save();

		return NextResponse.json({
			success: true,
			message: newMessage,
		});
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
