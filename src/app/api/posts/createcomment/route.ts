import { connectDb } from "@/dbConfig/connectDb";
import { getTokenData } from "@/helpers/getTokenData";
import { Post, postDocument } from "@/model/post.model";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function PUT(request: NextRequest) {
	try {
		await connectDb();
		const userId = await getTokenData(request);
		const reqBody = await request.json();
		const { commentText, postId } = reqBody;

		if (!commentText || !postId) {
			return NextResponse.json(
				{
					message: "Missing required fields",
				},
				{ status: 400 }
			);
		}
		const post: postDocument | null = await Post.findById(postId);

		if (!post) {
			return NextResponse.json(
				{
					message: "Post not found",
				},
				{ status: 404 }
			);
		}
		const newComment: any = {
			author: userId,
			comment: commentText,
			createdAt: new Date(),
		};

		post.comments.push(newComment);
		await post.save();

		return NextResponse.json({
			message: "Comment Published Successfully",
			success: true,
		});
	} catch (error: any) {
		console.log(error);
		return NextResponse.json(
			{ message: "Comment posting failed!" },
			{ status: 500 }
		);
	}
}
