// /app/api/posts/delete/route.ts
import { connectDb } from "@/dbConfig/connectDb";
import { Post } from "@/model/post.model";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;
export async function DELETE(request: NextRequest) {
	try {
		await connectDb();
		const reqBody = await request.json();
		const { postId } = reqBody;

		if (!postId) {
			return NextResponse.json(
				{ message: "Post ID is required" },
				{ status: 400 }
			);
		}

		const post = await Post.findByIdAndDelete(postId);

		if (!post) {
			return NextResponse.json(
				{ message: "Post not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json({
			message: "Post deleted successfully",
			success: true,
			post,
		});
	} catch (error: any) {
		console.log(error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
