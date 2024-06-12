"use client";
import Image from "next/image";
import React from "react";
import ProfilePic from "./../../../public/post.jpg";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Post from "@/components/Post";
import Link from "next/link";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MdLogout } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";

const Profile = () => {
	return (
		<div className='flex min-h-screen pt-4 flex-col relative items-center m-auto lg:w-[900px] md:w-[900px]'>
			<div className='w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
				<div className='flex justify-end pt-2 pr-2'>
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
							<Link href={"/updateprofile"}>
								<DropdownMenuItem>
									<FaEdit className='h-4 w-4 mr-2' />
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
									<MdLogout className='h-4 w-4 mr-2' />
									Logout
								</DropdownMenuItem>
							</Link>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
				<div className='flex flex-col items-center pb-10'>
					<Image
						className='w-40 h-40 mb-3 rounded-full shadow-lg'
						width={120}
						height={120}
						src={ProfilePic}
						alt='Profile Picture'
					/>
					<h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>
						Dheeru Rajpoot
					</h5>
					<span className='text-sm text-gray-500 dark:text-gray-400'>
						Web Developer
					</span>
					<div className='flex mt-4 md:mt-6'>
						<a
							href='#'
							className='inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
							Add friend
						</a>
						<a
							href='#'
							className='py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'>
							Message
						</a>
					</div>
				</div>
			</div>
			<Post />
		</div>
	);
};

export default Profile;
