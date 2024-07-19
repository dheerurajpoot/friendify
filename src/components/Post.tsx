import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { FaRegTrashAlt } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaRegHeart } from "react-icons/fa6";
import { FaRegCommentDots } from "react-icons/fa6";
import Link from "next/link";
import { BsFillSendFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
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
import { getUserFromLocalStorage } from "@/helpers/getUserFromLocalStorage";
import { User } from "@/app/search/page";

interface PostType {
	_id: string;
	postContent: string;
	image: string;
	createdBy: any;
	createdAt: string;
	likes: string[];
	comments: { _id: string; comment: string; createdAt: string }[];
}

interface PostProps {
	data: PostType;
	onDeletePost: (postId: string) => void;
	onRefresh: any;
}

const Post: React.FC<PostProps> = ({ data, onDeletePost, onRefresh }) => {
	const [commentText, setCommentText] = useState("");
	const [isLike, setIsLike] = useState(false);
	const [showComments, setShowComments] = useState(false);
	const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

	const toggleComments = () => {
		setShowComments(!showComments);
	};

	// create comment
	const commentHandler = async (postId: string) => {
		try {
			const res = await axios.put("/api/posts/createcomment", {
				commentText,
				postId,
			});
			if (res.data.success) {
				onRefresh(true);
				toast.success(res.data.message);
			}
			setCommentText("");
		} catch (error: any) {
			toast.error(error.response.data.message);
			throw new Error(error);
		}
	};

	// delete comment
	const commentDeleteHandler = async (postId: string, commentId: string) => {
		try {
			const res = await axios.delete("/api/posts/deletecomment", {
				data: { postId, commentId },
			});

			if (res.data.success) {
				onRefresh(true);
				toast.success(res.data.message);
			} else {
				toast.error(res.data.message);
			}
		} catch (error: any) {
			toast.error(error.response.data.message);
			throw new Error(error);
		}
	};

	useEffect(() => {
		if (data && loggedInUser) {
			setIsLike(data.likes.includes(loggedInUser._id));
		}
	}, [data, loggedInUser]);

	// like post

	const likeDislikeHandler = async (postId: string) => {
		try {
			const res = await axios.put("/api/posts/likedislike", {
				postId,
			});
			if (res.data.success) {
				setIsLike(!isLike);
			}
			toast.success(res.data.message);
		} catch (error: any) {
			toast.error(error.response.data.message);
			throw new Error(error);
		}
	};

	// get loggedIn user from localstorage

	useEffect(() => {
		const userData = getUserFromLocalStorage();
		if (userData) {
			setLoggedInUser(userData);
		}
	}, []);

	// delete post

	const postDeleteHandler = async (postId: string) => {
		try {
			const res = await axios.delete("/api/posts/deletepost", {
				data: { postId },
			});

			if (res.data.success) {
				toast.success(res.data.message);
				onDeletePost(postId);
			} else {
				toast.error(res.data.message);
			}
		} catch (error: any) {
			toast.error(error.response.data.message);
			throw new Error(error);
		}
	};

	const allComments = data.comments
		.slice()
		.sort(
			(a, b) =>
				new Date(b.createdAt).getTime() -
				new Date(a.createdAt).getTime()
		);

	return (
		<div className='bg-white my-4 dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm m-auto lg:w-[900px] md:w-[900px]'>
			<div className='p-4 pb-0 md:pb-2'>
				<div className='flex items-start space-x-4'>
					<Link href={`/profile/${data.createdBy?._id}`}>
						<Avatar>
							<AvatarImage
								src={data.createdBy?.profilepic}
								className='object-cover'
							/>
							<AvatarFallback>
								{data?.createdBy?.name?.charAt(0) || "U"}
							</AvatarFallback>
						</Avatar>
					</Link>
					<div className='flex-1'>
						<div className='flex items-center justify-between'>
							<div>
								<Link href={`/profile/${data?.createdBy?._id}`}>
									<h4 className='font-semibold md:text-base text-sm'>
										{data?.createdBy?.name || "Unknown"}
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
										<HiOutlineDotsVertical className='md:h-7 h-5 md:w-7 w-5' />
										<span className='sr-only'>
											More options
										</span>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align='end'>
									<Link
										href={`/profile/${data?.createdBy?._id}`}>
										<DropdownMenuItem className='cursor-pointer'>
											<FaRegUserCircle className='h-4 w-4 mr-2' />
											View Profile
										</DropdownMenuItem>
									</Link>
									{data?.createdBy?._id ===
										loggedInUser?._id && (
										<DropdownMenuItem
											className='cursor-pointer'
											onClick={() =>
												postDeleteHandler(data?._id)
											}>
											<FaRegTrashAlt className='h-4 w-4 mr-2' />
											Delete Post
										</DropdownMenuItem>
									)}
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
						<p className='text-gray-700 dark:text-gray-300 mt-2'>
							{data?.postContent}
						</p>
						{data.image && (
							<Image
								src={data?.image}
								width={400}
								height={400}
								alt='Post Image'
								className='mt-4 rounded-lg w-[90%] object-cover border-[1px]'
							/>
						)}
					</div>
				</div>
				<hr className='mt-4' />
				<div className='flex items-center justify-between space-x-4 px-5'>
					<div className='flex items-center justify-center gap-2'>
						<Button
							onClick={() => likeDislikeHandler(data?._id)}
							variant='ghost'
							size='icon'>
							{isLike ? (
								<FaHeart
									className='md:h-7 h-5 md:w-7 w-5'
									color='#F1330A'
								/>
							) : (
								<FaRegHeart className='md:h-7 h-5 md:w-7 w-5' />
							)}
							<span className='sr-only'>Like</span>
						</Button>
						<Button
							variant='ghost'
							size='icon'
							onClick={toggleComments}>
							<FaRegCommentDots className='md:h-7 h-5 md:w-7 w-5' />
							<span className='sr-only'>Comment</span>
						</Button>
					</div>
					<div className='text-gray-500 dark:text-gray-400 text-base'>
						{data.likes.length} likes •{" "}
						<span
							className='cursor-pointer underline'
							onClick={toggleComments}>
							{data.comments.length} comments
						</span>
					</div>
				</div>
				{showComments && (
					<div className='mt-4 border-t border-gray-200 dark:border-gray-800 pt-4'>
						<form className='flex items-center space-x-2 md:mx-10 lg:mx-10'>
							<Link href={`/profile/${loggedInUser?._id}`}>
								<Avatar>
									<AvatarImage
										className='object-cover'
										src={loggedInUser?.profilepic}
									/>
									<AvatarFallback>
										{loggedInUser?.name?.charAt(0) || "U"}
									</AvatarFallback>
								</Avatar>
							</Link>
							<Input
								placeholder='Write a comment...'
								className='flex-1'
								autoComplete='off'
								value={commentText}
								onChange={(
									e: React.ChangeEvent<HTMLInputElement>
								) => setCommentText(e.target.value)}
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
							allComments.map((commentData: any, index) => (
								<div
									key={index}
									className='mt-3 mb-2 space-y-4 md:mx-10 ml-6 lg:mx-10'>
									<hr />
									<div className='flex items-start space-x-4'>
										<Link
											href={`/profile/${commentData?.author?._id}`}>
											<Avatar>
												<AvatarImage
													src={
														commentData?.author
															?.profilepic
													}
													className='object-cover'
												/>
												<AvatarFallback>
													{commentData?.author?.name?.charAt(
														0
													) || "U"}
												</AvatarFallback>
											</Avatar>
										</Link>
										<div className='flex-1'>
											<div className='flex items-center justify-between'>
												<div>
													<h4 className='md:font-semibold font-medium inline text-sm'>
														{commentData?.author
															?.name || "Unknown"}
														{" . "}
													</h4>
													<p className='text-gray-500 inline dark:text-gray-400 text-sm'>
														{format(
															commentData?.createdAt
														)}
													</p>
												</div>
												<DropdownMenu>
													<DropdownMenuTrigger
														asChild>
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
														{commentData?.author
															?._id ===
															loggedInUser?._id && (
															<DropdownMenuItem
																onClick={() =>
																	commentDeleteHandler(
																		data?._id,
																		commentData?._id
																	)
																}
																className='cursor-pointer'>
																<FaRegTrashAlt className='h-4 w-4 mr-2' />
																Delete Comment
															</DropdownMenuItem>
														)}
														<Link
															href={`/profile/${commentData?.author?._id}`}>
															<DropdownMenuItem className='cursor-pointer'>
																<FaRegUserCircle className='h-4 w-4 mr-2' />
																View Profile
															</DropdownMenuItem>
														</Link>
													</DropdownMenuContent>
												</DropdownMenu>
											</div>
											<p className='text-gray-700 dark:text-gray-300'>
												{commentData?.comment}
											</p>
										</div>
									</div>
								</div>
							))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Post;
