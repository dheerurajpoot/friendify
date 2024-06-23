import { connectDb } from "@/dbConfig/connectDb";
import { Chat } from "@/model/chat.model";
import { Message } from "@/model/message.model";
import { NextRequest, NextResponse } from "next/server";

connectDb();

export async function POST(request: NextRequest) {
	try {
		const { sender, receiver, content, conversationId } =
			await request.json();

		const message = new Message({
			sender,
			receiver,
			content,
		});

		const savedMessage = await message.save();

		await Chat.findByIdAndUpdate(conversationId, {
			latestMessage: message._id,
		});

		return NextResponse.json({
			message: "Message sent successfully",
			success: true,
			savedMessage,
		});
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
