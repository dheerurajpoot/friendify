import { connectDb } from "@/dbConfig/connectDb";
import { Post } from "@/model/post.model";
import { NextRequest, NextResponse } from "next/server";

connectDb();
export async function GET(request: NextRequest) {
	try {
		const posts = await Post.find().populate(
			"createdBy",
			"name profilepic"
		);
		// .populate({
		// 	path: "comments.author",
		// 	select: "name profilepic",
		// });
		return NextResponse.json({
			message: "Posts Found",
			success: true,
			posts,
		});
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
