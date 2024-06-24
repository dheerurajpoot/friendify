import mongoose, { Types, PopulatedDoc, Document, Model } from "mongoose";
import { userDocument } from "./user.model";

export interface messageInterface {
	sender: Types.ObjectId | PopulatedDoc<userDocument>;
	receiver: Types.ObjectId | PopulatedDoc<userDocument>;
	content: string;
	conversationId: Types.ObjectId | PopulatedDoc<userDocument>;
	isSeen: boolean;
}
export interface messageDocument extends messageInterface, Document {
	createdAt: Date;
	updatedAt: Date;
}

const messageModel = new mongoose.Schema<messageDocument>(
	{
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		receiver: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		conversationId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Chat",
			required: true,
		},
		isSeen: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

export const Message: Model<messageDocument> =
	mongoose?.models?.Message || mongoose.model("Message", messageModel);
