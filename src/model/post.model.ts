import mongoose, { Types, Schema, Document, Model } from "mongoose";

export interface Comment {
	author: mongoose.Schema.Types.ObjectId;
	commentText: string;
	createdAt: Date;
}

export interface postInterface {
	postContent: string;
	image: string;
	likes: Types.ObjectId[];
	comments: Comment[];
	createdBy: mongoose.Schema.Types.ObjectId;
}
export interface postDocument extends postInterface, Document {
	createdAt: Date;
	updatedAt: Date;
}

const postModel = new mongoose.Schema<postDocument>(
	{
		postContent: {
			type: String,
		},
		image: {
			type: String,
		},
		likes: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		comments: [
			{
				author: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
					required: true,
				},
				comment: {
					type: String,
					required: true,
				},
				createdAt: {
					type: Date,
					default: Date.now,
				},
			},
		],
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

export const Post: Model<postDocument> =
	mongoose?.models?.Post || mongoose.model("Post", postModel);
