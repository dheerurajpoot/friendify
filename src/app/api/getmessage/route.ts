import { connectDb } from "@/dbConfig/connectDb";
import { Message } from "@/model/message.model";
import { NextRequest, NextResponse } from "next/server";

connectDb();

export async function GET(request: NextRequest) {
	try {
		// const { chatId } = request.url.searchParams;
		// const messages = await Message.find({ chatId }).sort({
		// 	createdAt: 1,
		// });
		// return NextResponse.json({
		// 	success: true,
		// 	messages,
		// });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
