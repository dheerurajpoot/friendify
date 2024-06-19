import mongoose, { Connection } from "mongoose";

let isConnected: Connection | boolean = false;

export const connectDb = async () => {
	if (isConnected) {
		console.log("Database already connected!");
		return isConnected;
	}
	try {
		const res = await mongoose.connect(process.env.MONGO_URI!);
		isConnected = res.connection;
		console.log("Database connected Successfully");
		return isConnected;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
