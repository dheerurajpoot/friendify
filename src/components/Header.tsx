"use client";
import React, { useState } from "react";
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

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};
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

				{/* <div className='relative'>
					<button
						className='hover:bg-gray-50 rounded-full p-1'
						type='button'
						id='menu-button'
						aria-expanded={isOpen}
						aria-haspopup='true'
						onClick={toggleMenu}>
						<HiOutlineDotsVertical size={24} />
					</button>
					{isOpen && (
						<div
							className='absolute right-0 z-10 mt-4 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
							role='menu'
							aria-orientation='vertical'
							aria-labelledby='menu-button'>
							<div className='py-1' role='none'>
								<Link
									href='/profile'
									className='block px-4 py-2 text-sm text-gray-700'
									role='menuitem'
									id='menu-item-0'>
									View Profile
								</Link>
								<Link
									href='#'
									className='block px-4 py-2 text-sm text-gray-700'
									role='menuitem'
									id='menu-item-1'>
									Support
								</Link>
								<Link
									href='#'
									className='block px-4 py-2 text-sm text-gray-700'
									role='menuitem'
									id='menu-item-1'>
									About Us
								</Link>
								<form role='none'>
									<button
										type='submit'
										className='block w-full px-4 py-2 text-left text-sm text-gray-700'
										role='menuitem'
										id='menu-item-3'>
										Sign out
									</button>
								</form>
							</div>
						</div>
					)}
				</div> */}
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
							<DropdownMenuItem>
								<FaRegTrashAlt className='h-4 w-4 mr-2' />
								Delete Post
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</div>
	);
};

export default Header;
