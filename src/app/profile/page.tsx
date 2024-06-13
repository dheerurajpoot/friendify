"use client";
import React from "react";
import ProfilePic from "./../../../public/post.jpg";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Post from "@/components/Post";
import Link from "next/link";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MdLogout } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoMailOpenOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { Separator } from "@/components/ui/separator";
import { IoSettingsOutline } from "react-icons/io5";
import Image from "next/image";
import { FiMessageCircle } from "react-icons/fi";
import { FiUserPlus } from "react-icons/fi";

const Profile = () => {
	return (
		<div className='flex min-h-screen pt-4 flex-col relative items-center m-auto lg:w-[900px] md:w-[900px]'>
			<Card className='w-full mx-auto'>
				<div className='relative'>
					<CardHeader className='bg-gray-100 dark:bg-gray-800 h-72 relative overflow-hidden'>
						<Image
							src={ProfilePic}
							alt='Banner'
							width={800}
							height={400}
							className='object-cover w-full h-full'
						/>
						<div className='absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
							<Avatar className='w-44 h-44 border-4 border-white dark:border-gray-950'>
								<AvatarImage src='https://github.com/shadcn.png' />
								<AvatarFallback>JD</AvatarFallback>
							</Avatar>
						</div>
					</CardHeader>
					<div className='absolute top-6 right-6'>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant='ghost'
									size='icon'
									className='rounded-full'>
									<HiOutlineDotsVertical className='w-6 h-6' />
									<span className='sr-only'>
										Open user menu
									</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align='end'>
								<DropdownMenuItem>
									<FaEdit className='w-4 h-4 mr-2' />
									Edit Profile
								</DropdownMenuItem>
								<DropdownMenuItem>
									<FaRegTrashAlt className='w-4 h-4 mr-2' />
									Delete Profile
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<MdLogout className='w-4 h-4 mr-2' />
									Logout
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
				<CardContent className='p-6 px-20'>
					<div className='grid gap-2'>
						<div className='flex items-center justify-between'>
							<h2 className='text-2xl font-bold'>
								Dheeru Rajpoot
							</h2>
							<Button
								variant='outline'
								className='flex items-center justify-center'>
								<IoSettingsOutline className='mr-2 h-4 w-4' />
								Edit Profile
							</Button>
						</div>
						<p className='text-gray-500 dark:text-gray-400'>
							Software Engineer at Lesshopy.
						</p>
						<Separator className='my-4' />
						<div className='grid gap-4'>
							<div className='flex items-center gap-2'>
								<IoMailOpenOutline className='w-5 h-5 text-gray-500 dark:text-gray-400' />
								<span className='text-gray-500 dark:text-gray-400'>
									john.doe@example.com
								</span>
							</div>
							<div className='flex items-center gap-2'>
								<SlCalender className='w-5 h-5 text-gray-500 dark:text-gray-400' />
								<span className='text-gray-500 dark:text-gray-400'>
									Joined in June 2021
								</span>
							</div>
							<div className='flex items-start gap-2'>
								<FaUserCheck className='w-5 h-5 text-gray-500 dark:text-gray-400 mt-1' />
								<div>
									<p className='text-gray-500 dark:text-gray-400'>
										I'm a software engineer with a passion
										for building innovative products. In my
										free time, I enjoy hiking and reading.
									</p>
								</div>
							</div>
						</div>
						<div className='flex items-center justify-center gap-8 mt-4'>
							<Button variant='outline' size='sm'>
								<FiMessageCircle className='w-4 h-4 mr-2' />
								Message
							</Button>
							<Button size='sm'>
								<FiUserPlus className='w-4 h-4 mr-2' />
								Follow
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>
			<Post />
		</div>
	);
};

export default Profile;
