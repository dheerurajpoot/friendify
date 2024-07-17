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

		// Populate post documents with createdBy and comments.author
		const populatedPosts = await Post.find()
			.populate({
				path: "createdBy",
				select: "name profilepic",
			})
			.populate({
				path: "comments",
				populate: {
					path: "author",
					select: "name profilepic",
				},
			})
			.lean();

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
