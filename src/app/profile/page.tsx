"use client";
import Image from "next/image";
import React, { useState } from "react";
import ProfilePic from "./../../../public/post.jpg";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Post from "@/components/Post";
import Link from "next/link";

const Profile = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};
	return (
		<div className='flex min-h-screen flex-col relative items-center m-auto lg:w-[900px] md:w-[900px]'>
			<div className='w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
				<div className='flex justify-end px-4 pt-4'>
					<button
						className='hover:bg-gray-50 rounded-full p-1'
						type='button'
						id='menu-button'
						aria-expanded={isOpen}
						aria-haspopup='true'
						onClick={toggleMenu}>
						<HiOutlineDotsVertical size={24} />
					</button>
					{/* <!-- Dropdown menu --> */}
					{isOpen && (
						<div
							className='absolute right-0 z-10 mt-8 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
							role='menu'
							aria-orientation='vertical'
							aria-labelledby='menu-button'>
							<div className='py-1' role='none'>
								<Link
									href='#'
									className='block px-4 py-2 text-sm text-gray-700'
									role='menuitem'
									id='menu-item-0'>
									Edit Profile
								</Link>
								<Link
									href='#'
									className='block px-4 py-2 text-sm text-gray-700'
									role='menuitem'
									id='menu-item-1'>
									Support
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
