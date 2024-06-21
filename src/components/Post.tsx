"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { FaRegTrashAlt } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { CiHeart } from "react-icons/ci";
import { FaCommentDots } from "react-icons/fa6";
import Link from "next/link";
import { BsFillSendFill } from "react-icons/bs";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { format } from "timeago.js";
import axios from "axios";
import toast from "react-hot-toast";

interface PostType {
	_id: string;
	postContent: string;
	image: string;
	createdBy: any;
	createdAt: string;
	likes: [];
	comments: [];
}
interface PostProps {
	data: PostType;
}
const Post: React.FC<PostProps> = ({ data }) => {
	const [commentText, setCommentText] = useState("");

	const commentHandler = async (postId: any) => {
		try {
			const res = await axios.post("/api/posts/createcomment", {
				commentText,
				postId,
			});
			toast.success(res.data.message);
			setCommentText("");
		} catch (error: any) {
			throw new Error(error);
		}
	};
	console.log(data);

	return (
		<div className='bg-white my-4 dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm m-auto lg:w-[900px] md:w-[900px]'>
			<div className='p-4'>
				<div className='flex items-start space-x-4'>
					<Link href={`/profile/${data?.createdBy?._id}`}>
						<Avatar>
							<AvatarImage
								src={data?.createdBy?.profilepic}
								className='object-cover'
							/>
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
					</Link>
					<div className='flex-1'>
						<div className='flex items-center justify-between'>
							<div>
								<Link href={`/profile/${data?.createdBy?._id}`}>
									<h4 className='font-semibold text-base'>
										{data?.createdBy.name}
									</h4>
								</Link>
								<p className='text-gray-500 dark:text-gray-400 text-sm'>
									{format(data?.createdAt)}
								</p>
							</div>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant='ghost'
										size='icon'
										className='rounded-full'>
										<HiOutlineDotsVertical className='h-8 w-8' />
										<span className='sr-only'>
											More options
										</span>
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
						<p className='text-gray-700 dark:text-gray-300 mt-2'>
							{data?.postContent}
						</p>
						{data?.image && (
							<Image
								src={data?.image}
								width={700}
								height={450}
								alt='Post Image'
								className='mt-4 rounded-lg w-full object-cover'
							/>
						)}
					</div>
				</div>
				<div className='mt-4 flex items-center justify-between space-x-4 px-5'>
					<div className='flex items-center justify-center gap-4'>
						<Button variant='ghost' size='icon'>
							<CiHeart className='h-8 w-8' />
							<span className='sr-only'>Like</span>
						</Button>
						<Button variant='ghost' size='icon'>
							<FaCommentDots className='h-7 w-7' />
							<span className='sr-only'>Comment</span>
						</Button>
					</div>
					<div className='text-gray-500 dark:text-gray-400 text-base'>
						{data?.likes?.length} likes • {data?.comments?.length}{" "}
						comments
					</div>
				</div>
				<div className='mt-4 border-t border-gray-200 dark:border-gray-800 pt-4'>
					<form className='flex items-center space-x-2'>
						<Link href={"/profile"}>
							<Avatar>
								<AvatarImage
									className='object-cover'
									src={data?.createdBy?.profilepic}
								/>
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
						</Link>
						<Input
							placeholder='Write a comment...'
							className='flex-1'
							autoComplete='off'
							value={commentText}
							onChange={(e: any) =>
								setCommentText(e.target.value)
							}
						/>
						<Button
							type='button'
							onClick={() => commentHandler(data?._id)}
							size='icon'>
							<BsFillSendFill className='h-4 w-4' />
							<span className='sr-only'>Send</span>
						</Button>
					</form>
					{data.comments &&
						data.comments.map((commentData: any) => (
							<div className='mt-4 space-y-4'>
								<div className='flex items-start space-x-4'>
									<Link href={"/profile"}>
										<Avatar>
											<AvatarImage src='https://github.com/shadcn.png' />
											<AvatarFallback>CN</AvatarFallback>
										</Avatar>
									</Link>
									<div className='flex-1'>
										<div className='flex items-center justify-between'>
											<div>
												<h4 className='font-semibold text-sm'>
													Unknown
												</h4>
												<p className='text-gray-500 dark:text-gray-400 text-sm'>
													{format(
														commentData.createdAt
													)}
												</p>
											</div>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														variant='ghost'
														size='icon'
														className='rounded-full'>
														<HiOutlineDotsVertical className='h-6 w-6' />
														<span className='sr-only'>
															More options
														</span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align='end'>
													<DropdownMenuItem>
														<FaRegTrashAlt className='h-4 w-4 mr-2' />
														Delete Comment
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</div>
										<p className='text-gray-700 dark:text-gray-300 mt-2'>
											{commentData.comment}
										</p>
									</div>
								</div>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};
export default Post;
