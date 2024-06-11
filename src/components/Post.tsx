import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import Image from "next/image";
import PostImage from "./../../public/post.jpg";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { CiHeart } from "react-icons/ci";
import { FaCommentDots } from "react-icons/fa6";

const Post = () => {
	return (
		<div className='w-full'>
			{/* <!-- component --> */}
			<div className='flex items-center justify-center my-5 w-full'>
				<div className='bg-white p-8 rounded-lg shadow-md w-full'>
					{/* <!-- User Info with Three-Dot Menu --> */}
					<div className='flex items-center justify-between mb-4'>
						<div className='flex items-center space-x-2'>
							<Avatar>
								<AvatarImage src='https://github.com/shadcn.png' />
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
							<div>
								<p className='text-gray-800 font-semibold'>
									John Doe
								</p>
								<p className='text-gray-500 text-sm'>
									Posted 2 hours ago
								</p>
							</div>
						</div>
						<div className='text-gray-500 cursor-pointer'>
							{/* <!-- Three-dot menu icon --> */}
							<button className='hover:bg-gray-50 rounded-full p-1'>
								<HiOutlineDotsVertical size={24} />
							</button>
						</div>
					</div>
					{/* <!-- Message --> */}
					<div className='mb-4'>
						<p className='text-gray-800'>
							Just another day with adorable kittens! 🐱{" "}
							<a href='' className='text-blue-600'>
								#CuteKitten
							</a>
							<a href='' className='text-blue-600'>
								#AdventureCat
							</a>
						</p>
					</div>
					{/* <!-- Image --> */}
					<div className='mb-4'>
						<Image
							src={PostImage}
							alt='Post Image'
							width={500}
							height={500}
							className='w-full h-auto object-cover rounded-md'
						/>
					</div>
					{/* <!-- Like and Comment Section --> */}
					<div className='flex items-center justify-between text-gray-500'>
						<div className='flex items-center space-x-2'>
							<button className='flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1'>
								<CiHeart size={24} />
								<span>42 Likes</span>
							</button>
						</div>
						<button className='flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1'>
							<FaCommentDots />
							<span>3 Comment</span>
						</button>
					</div>
					<hr className='mt-2 mb-2' />
					<p className='text-gray-800 font-semibold'>Comment</p>
					<hr className='mt-2 mb-2' />
					<div className='mt-4'>
						{/* <!-- Comment 1 --> */}
						<div className='flex items-center space-x-2 mb-4'>
							<Avatar>
								<AvatarImage src='https://github.com/shadcn.png' />
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
							<div>
								<p className='text-gray-800 font-semibold'>
									Jane Smith
								</p>
								<p className='text-gray-500 text-sm'>
									Lovely shot! 📸
								</p>
							</div>
						</div>
						{/* <!-- Comment 2 --> */}
						<div className='flex items-center space-x-2 mt-2'>
							<Avatar>
								<AvatarImage src='https://github.com/shadcn.png' />
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
							<div>
								<p className='text-gray-800 font-semibold'>
									Bob Johnson
								</p>
								<p className='text-gray-500 text-sm'>
									I can't handle the cuteness! Where can I get
									one?
								</p>
							</div>
						</div>

						<form className='w-full mx-auto py-4'>
							<label
								htmlFor='message'
								className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
								Post comment
							</label>
							<textarea
								id='message'
								className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
								placeholder='Leave a comment...'></textarea>
							<div className='flex items-center justify-end'>
								<Button className='mt-2'>Post Comment</Button>
							</div>
						</form>

						{/* <!-- Add more comments and replies as needed --> */}
						<div className='mt-4 flex items-center justify-center'>
							<Button>View All Comments</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Post;
