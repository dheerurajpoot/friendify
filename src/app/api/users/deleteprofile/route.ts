import { connectDb } from "@/dbConfig/connectDb";
import { User } from "@/model/user.model";
import { Post } from "@/model/post.model"; // Import Post model
import { NextRequest, NextResponse } from "next/server";
import { getTokenData } from "@/helpers/getTokenData";
export const revalidate = 0;

export async function PUT(request: NextRequest) {
	try {
		await connectDb();
		const userId = await getTokenData(request);

		// Find the user by email
		const user = await User.findByIdAndUpdate(
			{ _id: userId },
			{
				name: "Deleted User",
				email: "email",
				profession: "",
				profilepic: "",
				about: "",
				password: "",
			}
		);

		if (!user) {
			return NextResponse.json(
				{ message: "User not found" },
				{ status: 404 }
			);
		}

		await Post.deleteMany({ createdBy: user._id });

		return NextResponse.json({
			message: "Profile deleted successfully",
			success: true,
		});
	} catch (error: any) {
		console.error(error);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
