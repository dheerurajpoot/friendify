// /app/api/comments/delete/route.ts
import { connectDb } from "@/dbConfig/connectDb";
import { Post } from "@/model/post.model";
import { NextRequest, NextResponse } from "next/server";
export const revalidate = 0;

export async function DELETE(request: NextRequest) {
	try {
		await connectDb();
		const reqBody = await request.json();
		const { postId, commentId } = reqBody;

		if (!postId || !commentId) {
			return NextResponse.json(
				{ message: "Post ID and Comment ID are required" },
				{ status: 400 }
			);
		}
		const post = await Post.findById(postId);
		if (!post) {
			return NextResponse.json(
				{ message: "Post not found" },
				{ status: 404 }
			);
		}
		const commentIndex = post.comments.findIndex(
			(comment: any) => comment?._id?.toString() === commentId
		);

		if (commentIndex === -1) {
			return NextResponse.json(
				{ message: "Comment not found" },
				{ status: 404 }
			);
		}

		post.comments.splice(commentIndex, 1);
		await post.save();

		return NextResponse.json({
			message: "Comment deleted successfully",
			success: true,
		});
	} catch (error: any) {
		console.log(error);
		return NextResponse.json(
			{ message: "Deleting Comment Failed!" },
			{ status: 500 }
		);
	}
}
