import React from "react";
import { Menubar, MenubarMenu, MenubarTrigger } from "./ui/menubar";
import { FaHome } from "react-icons/fa";
import { FaFacebookMessenger } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { IoSearchSharp } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";

const NavMenu = () => {
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
						<Link href={"/profile"}>
							<Avatar>
								<AvatarImage src='https://github.com/shadcn.png' />
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
						</Link>
					</MenubarTrigger>
				</MenubarMenu>
			</Menubar>
		</div>
	);
};

export default NavMenu;
