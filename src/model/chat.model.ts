import mongoose, { Model, Types } from "mongoose";
import { Document } from "mongoose";

export interface chatInterface {
	participants: mongoose.Types.ObjectId[];
	latestMessage: mongoose.Types.ObjectId;
}
export interface chatDocument extends chatInterface, Document {
	createdAt: Date;
	updatedAt: Date;
}

const chatModel = new mongoose.Schema<chatDocument>(
	{
		participants: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
				required: true,
			},
		],
		latestMessage: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Message",
			},
		],
	},
	{ timestamps: true }
);

export const Chat: Model<chatDocument> =
	mongoose?.models?.Chat || mongoose.model("Chat", chatModel);
