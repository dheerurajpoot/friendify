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

const NavMenu = () => {
	const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

	useEffect(() => {
		const userData = getUserFromLocalStorage();
		if (userData) {
			setLoggedInUser(userData);
		}
	}, []);
	return (
		<div className='flex justify-center items-center w-full fixed bottom-4 bg-white  '>
			<Menubar className='flex justify-between items-center w-[900px] h-[80px] p-4 px-12 shadow-2xl'>
				<MenubarMenu>
					<MenubarTrigger>
						<Link href={"/"}>
							<FaHome size={30} />
						</Link>
					</MenubarTrigger>
				</MenubarMenu>
				<MenubarMenu>
					<MenubarTrigger>
						<Link href={"/friends"}>
							<FaUserFriends size={30} />
						</Link>
					</MenubarTrigger>
				</MenubarMenu>
				<MenubarMenu>
					<MenubarTrigger>
						<Link href={"/chat"}>
							<FaFacebookMessenger size={30} />
						</Link>
					</MenubarTrigger>
				</MenubarMenu>
				<MenubarMenu>
					<MenubarTrigger>
						<Link href={"/search"}>
							<IoSearchSharp size={30} />
						</Link>
					</MenubarTrigger>
				</MenubarMenu>
				<MenubarMenu>
					<MenubarTrigger>
						<Link href={"/notification"}>
							<IoNotifications size={30} />
						</Link>
					</MenubarTrigger>
				</MenubarMenu>
				<MenubarMenu>
					<MenubarTrigger>
						<Link href={`/profile/${loggedInUser?._id}`}>
							<Avatar>
								<AvatarImage
									src={loggedInUser?.profilepic}
									className='object-cover'
								/>
								<AvatarFallback>
									{loggedInUser?.name.charAt(0)}
								</AvatarFallback>
							</Avatar>
						</Link>
					</MenubarTrigger>
				</MenubarMenu>
			</Menubar>
		</div>
	);
};

export default NavMenu;
