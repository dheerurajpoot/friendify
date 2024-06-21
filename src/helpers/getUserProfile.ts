import axios from "axios";

export const getProfile = async (userId: any) => {
	try {
		const response = await axios.post("/api/users/profile", userId);
		console.log(response.data);
	} catch (error: any) {
		throw new Error(error);
	}
};
