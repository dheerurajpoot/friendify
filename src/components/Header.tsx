"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { HiOutlineDotsVertical } from "react-icons/hi";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { FaRegTrashAlt } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";

const Header = () => {
	return (
		<div className='flex fixed top-0 bg-white items-center justify-center z-10 w-full overflow-hidden h-[80px] border-y-[1px] border-gray-400 '>
			<div className='flex justify-between items-center w-[900px] p-4'>
				<div>
					<Link href={"/profile"}>
						<Avatar>
							<AvatarImage src='https://github.com/shadcn.png' />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
					</Link>
				</div>
				<div>
					<Link href={"/"}>
						<h2 className='text-xl font-bold'>Friendify</h2>
					</Link>
				</div>

				<div className='relative'>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant='ghost'
								size='icon'
								className='rounded-full relative'>
								<HiOutlineDotsVertical className='h-8 w-8' />
								<span className='sr-only'>More options</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							<Link href={"/profile"}>
								<DropdownMenuItem>
									<FaRegUserCircle className='h-4 w-4 mr-2' />
									Profile
								</DropdownMenuItem>
							</Link>
							<Link href={"/"}>
								<DropdownMenuItem>
									<BiSupport className='h-4 w-4 mr-2' />
									Support
								</DropdownMenuItem>
							</Link>
							<Link href={"/"}>
								<DropdownMenuItem>
									<FcAbout className='h-4 w-4 mr-2' />
									About
								</DropdownMenuItem>
							</Link>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</div>
	);
};

export default Header;
