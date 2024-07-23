"use client";
import React, { useEffect, useState } from "react";
import { Menubar, MenubarMenu, MenubarTrigger } from "./ui/menubar";
import { FaHome } from "react-icons/fa";
import { FaFacebookMessenger } from "react-icons/fa";
// import { IoNotifications } from "react-icons/io5";
import { IoSearchSharp } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { User } from "@/app/search/page";
import { getUserFromLocalStorage } from "@/helpers/getUserFromLocalStorage";

const NavMenu = () => {
	const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
	useEffect(() => {
		const userData = getUserFromLocalStorage();
		if (userData) {
			setLoggedInUser(userData);
		}
	}, []);
	return (
		<div className='flex justify-center items-center w-full fixed bottom-0 bg-white  '>
			<Menubar className='flex justify-between items-center w-[900px] h-[80px] p-4 lg:px-12 md:px-12 shadow-2xl'>
				<MenubarMenu>
					<Link href={"/"}>
						<MenubarTrigger className='flex flex-col items-center justify-center cursor-pointer'>
							<FaHome className='h-6 md:h-8 w-6 md:w-8' />
							<span>Home</span>
						</MenubarTrigger>
					</Link>
				</MenubarMenu>
				<MenubarMenu>
					<Link href={"/friends"}>
						<MenubarTrigger className='flex flex-col items-center justify-center cursor-pointer'>
							<FaUserFriends className='h-6 md:h-8 w-6 md:w-8' />
							<span>Friends</span>
						</MenubarTrigger>
					</Link>
				</MenubarMenu>
				<MenubarMenu>
					<Link href={"/chat"}>
						<MenubarTrigger className='flex flex-col items-center justify-center cursor-pointer'>
							<FaFacebookMessenger className='h-6 md:h-8 w-6 md:w-8' />
							<span>Chat</span>
						</MenubarTrigger>
					</Link>
				</MenubarMenu>
				<MenubarMenu>
					<Link href={"/search"}>
						<MenubarTrigger className='flex flex-col items-center justify-center cursor-pointer'>
							<IoSearchSharp className='h-6 md:h-8 w-6 md:w-8' />
							<span>Search</span>
						</MenubarTrigger>
					</Link>
				</MenubarMenu>
				{/* <MenubarMenu>
					<Link href={"/notification"}>
						<MenubarTrigger className='cursor-pointer'>
							<IoNotifications size={30} />
						</MenubarTrigger>
					</Link>
				</MenubarMenu> */}
				<MenubarMenu>
					<Link href={`/profile/${loggedInUser?._id}`}>
						<MenubarTrigger className='flex flex-col items-center justify-center cursor-pointer'>
							<Avatar className='h-6 md:h-8 w-6 md:w-8'>
								<AvatarImage
									src={loggedInUser?.profilepic}
									className='object-cover'
								/>
								<AvatarFallback>
									{loggedInUser?.name.charAt(0)}
								</AvatarFallback>
							</Avatar>
							<span>Profile</span>
						</MenubarTrigger>
					</Link>
				</MenubarMenu>
			</Menubar>
		</div>
	);
};

export default NavMenu;
