"use client";
import React, { useEffect, useState } from "react";
import { Menubar, MenubarMenu, MenubarTrigger } from "./ui/menubar";
import { FaHome } from "react-icons/fa";
import { FaFacebookMessenger } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { IoSearchSharp } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { User } from "@/app/search/page";
import { getUserFromLocalStorage } from "@/helpers/getUserFromLocalStorage";
import { useRouter } from "next/navigation";

const NavMenu = () => {
	const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
	const router = useRouter();
	useEffect(() => {
		const userData = getUserFromLocalStorage();
		if (userData) {
			setLoggedInUser(userData);
		}
	}, []);
	const toFriends = () => {
		router.push("/friends");
	};
	return (
		<div className='flex justify-center items-center w-full fixed bottom-4 bg-white  '>
			<Menubar className='flex justify-between items-center w-[900px] h-[80px] p-4 px-12 shadow-2xl'>
				<MenubarMenu>
					<Link href={"/"}>
						<MenubarTrigger className='cursor-pointer'>
							<FaHome size={30} />
						</MenubarTrigger>
					</Link>
				</MenubarMenu>
				<MenubarMenu>
					<Link href={"/friends"}>
						<MenubarTrigger className='cursor-pointer'>
							<FaUserFriends size={30} />
						</MenubarTrigger>
					</Link>
				</MenubarMenu>
				<MenubarMenu>
					<Link href={"/chat"}>
						<MenubarTrigger className='cursor-pointer'>
							<FaFacebookMessenger size={30} />
						</MenubarTrigger>
					</Link>
				</MenubarMenu>
				<MenubarMenu>
					<Link href={"/search"}>
						<MenubarTrigger className='cursor-pointer'>
							<IoSearchSharp size={30} />
						</MenubarTrigger>
					</Link>
				</MenubarMenu>
				<MenubarMenu>
					<Link href={"/notification"}>
						<MenubarTrigger className='cursor-pointer'>
							<IoNotifications size={30} />
						</MenubarTrigger>
					</Link>
				</MenubarMenu>
				<MenubarMenu>
					<Link href={`/profile/${loggedInUser?._id}`}>
						<MenubarTrigger className='cursor-pointer'>
							<Avatar>
								<AvatarImage
									src={loggedInUser?.profilepic}
									className='object-cover'
								/>
								<AvatarFallback>
									{loggedInUser?.name.charAt(0)}
								</AvatarFallback>
							</Avatar>
						</MenubarTrigger>
					</Link>
				</MenubarMenu>
			</Menubar>
		</div>
	);
};

export default NavMenu;
