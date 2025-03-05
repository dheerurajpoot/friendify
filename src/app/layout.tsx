// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "HikeTok: Connect with your friends",
	description: "Connect with your friends everywhere in the World",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			 <head>
      				 <meta name="google-adsense-account" content="ca-pub-8559499402519284">
     			 </head>
			<body className={inter.className}>
				<LayoutWrapper>{children}</LayoutWrapper>
			</body>
		</html>
	);
}
