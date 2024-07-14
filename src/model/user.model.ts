import mongoose from "mongoose";

export interface userInterface {
	name: string;
	username: string;
	email: string;
	profilepic: string;
	password: string;
	isVerified: boolean;
	forgotPasswordToken: string;
	forgotPasswordTokenExpiry: Date;
	verifyToken: string;
	verifyTokenExpiry: Date;
	profession: string;
	about: string;
	followers: mongoose.Types.ObjectId[];
	following: mongoose.Types.ObjectId[];
}

export interface userDocument extends userInterface, mongoose.Document {
	createdAt: Date;
	updatedAt: Date;
}

const userModel = new mongoose.Schema<userDocument>(
	{
		name: String,
		username: {
			type: String,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		profilepic: String,
		password: {
			type: String,
			required: true,
		},
		profession: String,
		about: String,
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

export const User: mongoose.Model<userDocument> =
	mongoose.models.User || mongoose.model<userDocument>("User", userModel);
