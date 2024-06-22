export const getUserFromLocalStorage = () => {
	if (typeof window !== "undefined") {
		const user = localStorage.getItem("user");
		if (user) {
			return JSON.parse(user);
		}
	}
	return null;
};
