import mongoose, { Document, Model } from "mongoose";

export interface userInterface {
	name: string;
	username: string;
	email: string;
	profilepic: string;
	password: string;
	isVerified: Boolean;
	forgotPasswordToken: string;
	forgotPasswordTokenExpiry: string;
	verifyToken: string;
	verifyTokenExpiry: string;
	profession: string;
	about: string;
	followers: any;
	following: any;
}
export interface userDocument extends userInterface, Document {
	createdAt: Date;
	updatedAt: Date;
}

const userModel = new mongoose.Schema<userDocument>(
	{
		name: {
			type: String,
		},
		username: {
			type: String,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		profilepic: {
			type: String,
		},
		password: {
			type: String,
			required: true,
		},
		profession: {
			type: String,
		},
		about: {
			type: String,
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		followers: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		following: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		forgotPasswordToken: String,
		forgotPasswordTokenExpiry: Date,
		verifyToken: String,
		verifyTokenExpiry: Date,
	},
	{ timestamps: true }
);

export const User: Model<userDocument> =
	mongoose?.models?.User || mongoose.model("User", userModel);
