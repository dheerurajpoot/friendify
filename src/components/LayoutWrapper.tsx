"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import NavMenu from "@/components/NavMenu";
import { Toaster } from "react-hot-toast";

export default function LayoutWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const noLayoutPaths = [
		"/login",
		"/sign-up",
		"/verifyemail",
		"/forgotpassword",
		"/resetpassword",
	];

	return (
		<>
			{!noLayoutPaths.includes(pathname) && <Header />}
			<Toaster />
			<div className='mt-24 mb-16'>{children}</div>
			{!noLayoutPaths.includes(pathname) && <NavMenu />}
		</>
	);
}
