import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import NavMenu from "@/components/NavMenu";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Friendify: Connect with your friends",
	description: "Connect with your friends everywere in the World",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<Header />
				<Toaster />
				<div className='my-20'>{children}</div>
				<NavMenu />
			</body>
		</html>
	);
}
