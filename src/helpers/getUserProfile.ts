import axios from "axios";

export const getUserProfile = async (userId: any) => {
	try {
		const response = await axios.post("/api/users/profile", { userId });

		if (response.data && response.data.data) {
			return response.data;
		}
		return null;
	} catch (error: any) {
		console.error("Error fetching user profile:", error);
		throw error;
	}
};
