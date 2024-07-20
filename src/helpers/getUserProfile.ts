import axios from "axios";

export const getUserProfile = async (userId: any) => {
	try {
		const response = await axios.post("/api/users/profile", userId);
		return response?.data?.data;
	} catch (error: any) {
		throw new Error(error);
	}
};
