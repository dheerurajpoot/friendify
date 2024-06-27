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
	const noLayoutPaths = ["/login", "/sign-up", "/verifyemail"];

	return (
		<>
			{!noLayoutPaths.includes(pathname) && <Header />}
			<Toaster />
			<div className='my-24'>{children}</div>
			{!noLayoutPaths.includes(pathname) && <NavMenu />}
		</>
	);
}
