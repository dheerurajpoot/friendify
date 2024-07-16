import { connectDb } from "@/dbConfig/connectDb";
import { Post, postDocument } from "@/model/post.model";
import { User, userDocument } from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";
import mongoose, { Types } from "mongoose";

interface PopulatedComment {
	author: {
		_id: Types.ObjectId;
		name: string;
		profilepic: string;
	} | null;
	comment: string;
	createdAt: Date;
}

interface PopulatedPost {
	postContent: string;
	image: string;
	likes: Types.ObjectId[];
	comments: PopulatedComment[];
	createdBy: {
		_id: Types.ObjectId;
		name: string;
		profilepic: string;
	} | null;
	createdAt: Date;
	updatedAt: Date;
}

export async function GET(request: NextRequest) {
	try {
		await connectDb();

		const posts: postDocument[] = await Post.find().lean();

		const populatedPosts: PopulatedPost[] = await Promise.all(
			posts.map(async (post) => {
				const createdBy = post.createdBy
					? await User.findById(post.createdBy)
							.select("name profilepic")
							.lean()
					: null;
				const comments = await Promise.all(
					post.comments.map(async (comment) => {
						const author = comment.author
							? await User.findById(comment.author)
									.select("name profilepic")
									.lean()
							: null;
						return {
							...comment,
							author: author
								? {
										_id: author._id as Types.ObjectId,
										name: author.name,
										profilepic: author.profilepic,
								  }
								: null,
						} as unknown as PopulatedComment;
					})
				);
				return {
					...post,
					createdBy: createdBy
						? {
								_id: createdBy._id as Types.ObjectId,
								name: createdBy.name,
								profilepic: createdBy.profilepic,
						  }
						: null,
					comments,
				} as unknown as PopulatedPost;
			})
		);

		return NextResponse.json({
			message: "Posts Found",
			success: true,
			posts: populatedPosts,
		});
	} catch (error: any) {
		console.log(error);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
