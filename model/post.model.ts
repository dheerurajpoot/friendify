import mongoose, { Types, PopulatedDoc, Document, Model } from "mongoose";
import { userDocument } from "./user.model";

export interface postInterface {
	description: string;
	postImage: string;
	likes: Types.ObjectId[];
	comments: Types.Array<{
		userId: Types.ObjectId | PopulatedDoc<userDocument>;
		comment: string;
		createdAt: Date;
	}>;
	userId: Types.ObjectId | PopulatedDoc<userDocument>;
}
export interface postDocument extends postInterface, Document {
	createdAt: Date;
	updatedAt: Date;
}

const postModel = new mongoose.Schema<postDocument>(
	{
		description: {
			type: String,
		},
		postImage: {
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
				userId: {
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
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

export const Post: Model<postDocument> =
	mongoose?.models?.Posts || mongoose.model("Post", postModel);
