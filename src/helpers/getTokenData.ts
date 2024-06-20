import { connectDb } from "@/dbConfig/connectDb";
import { User } from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
connectDb();

export const getTokenData = async (request: NextRequest) => {
	try {
		const token = request.cookies.get("token")?.value || "";
		const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
		return decodedToken.id;
	} catch (error: any) {
		throw new Error(error.message);
	}
};
