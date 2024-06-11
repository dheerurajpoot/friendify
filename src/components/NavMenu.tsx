import React from "react";
import { Menubar, MenubarMenu, MenubarTrigger } from "./ui/menubar";
import { FaHome } from "react-icons/fa";
import { FaFacebookMessenger } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { IoSearchSharp } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const NavMenu = () => {
	return (
		<div className='flex justify-center items-center w-full fixed bottom-0 bg-white shadow border-t-[1px] border-gray-400'>
			<Menubar className='flex justify-between items-center w-[900px] h-[80px] p-4 px-12'>
				<MenubarMenu>
					<MenubarTrigger>
						<FaHome size={30} />
					</MenubarTrigger>
				</MenubarMenu>
				<MenubarMenu>
					<MenubarTrigger>
						<FaFacebookMessenger size={30} />
					</MenubarTrigger>
				</MenubarMenu>
				<MenubarMenu>
					<MenubarTrigger>
						<IoSearchSharp size={30} />
					</MenubarTrigger>
				</MenubarMenu>
				<MenubarMenu>
					<MenubarTrigger>
						<IoNotifications size={30} />
					</MenubarTrigger>
				</MenubarMenu>
				<MenubarMenu>
					<MenubarTrigger>
						<Avatar>
							<AvatarImage src='https://github.com/shadcn.png' />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
					</MenubarTrigger>
				</MenubarMenu>
			</Menubar>
		</div>
	);
};

export default NavMenu;
