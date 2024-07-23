"use client";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import NavMenu from "@/components/NavMenu";
import { Toaster } from "react-hot-toast";
import { socket } from "@/socket";
import { useEffect, useState } from "react";
import { getUserFromLocalStorage } from "@/helpers/getUserFromLocalStorage";
import { User } from "@/app/search/page";

export default function LayoutWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

	const noLayoutPaths = [
		"/login",
		"/sign-up",
		"/verifyemail",
		"/forgotpassword",
		"/resetpassword",
	];

	useEffect(() => {
		const userData = getUserFromLocalStorage();
		if (userData) {
			setLoggedInUser(userData);
		}
	}, []);

	useEffect(() => {
		const handleFocus = async () => {
			socket.emit("online users", loggedInUser?._id);
		};

		const handleBlur = () => {
			socket.emit("offline", loggedInUser?._id);
		};

		window.addEventListener("focus", handleFocus);
		window.addEventListener("blur", handleBlur);

		return () => {
			window.removeEventListener("focus", handleFocus);
			window.removeEventListener("blur", handleBlur);
		};
	}, [loggedInUser?._id]);

	return (
		<>
			{!noLayoutPaths.includes(pathname) && <Header />}
			<Toaster />
			<div className='mt-24 mb-16'>{children}</div>
			{!noLayoutPaths.includes(pathname) && <NavMenu />}
		</>
	);
}
