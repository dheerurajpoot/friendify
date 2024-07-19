import mongoose, { Types, Document, Model } from "mongoose";

export interface Comment {
	_id: mongoose.Schema.Types.ObjectId;
	author: mongoose.Schema.Types.ObjectId;
	comment: string;
	createdAt: Date;
}

export interface PostInterface {
	postContent: string;
	image: string;
	likes: Types.ObjectId[];
	comments: Comment[];
	createdBy: mongoose.Schema.Types.ObjectId;
}

export interface postDocument extends PostInterface, Document {
	createdAt: Date;
	updatedAt: Date;
}

const commentSchema = new mongoose.Schema<Comment>({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
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
});

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
		comments: [commentSchema],
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

export const Post: Model<postDocument> =
	mongoose?.models?.Post || mongoose.model("Post", postModel);
