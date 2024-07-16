import { connectDb } from "@/dbConfig/connectDb";
import { getTokenData } from "@/helpers/getTokenData";
import { Post } from "@/model/post.model";
import { NextRequest, NextResponse } from "next/server";
connectDb();

export async function POST(request: NextRequest) {
	try {
		const userId = await getTokenData(request);
		const reqBody = await request.json();
		const { postContent, image } = reqBody;

		const newPost = new Post({
			postContent,
			image,
			createdBy: userId,
		});
		const post = await newPost.save();

		return NextResponse.json({
			message: "Post Published Successfully",
			success: true,
			post,
		});
	} catch (error: any) {
		console.log(error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
