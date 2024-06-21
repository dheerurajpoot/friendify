import { connectDb } from "@/dbConfig/connectDb";
import { getTokenData } from "@/helpers/getTokenData";
import { Post, postDocument } from "@/model/post.model";
import { NextRequest, NextResponse } from "next/server";
connectDb();

export async function PUT(request: NextRequest) {
	try {
		const userId = await getTokenData(request);
		const reqBody = await request.json();
		const { postId } = reqBody;
		const post: postDocument | null = await Post.findById(postId);
		if (!post) {
			return NextResponse.json(
				{
					error: "Post not found",
				},
				{ status: 404 }
			);
		}

		if (post.likes.includes(userId)) {
			await Post.findByIdAndUpdate(postId, {
				$pull: { likes: userId },
			});
			return NextResponse.json({
				message: "Post Disliked",
				success: true,
			});
		} else {
			await Post.findByIdAndUpdate(postId, {
				$push: { likes: userId },
			});
			return NextResponse.json({
				message: "Post Liked",
				success: true,
			});
		}
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
