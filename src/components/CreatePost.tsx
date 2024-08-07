"use client";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { BsEmojiSmile } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { FaRegImage } from "react-icons/fa6";
import axios from "axios";
import toast from "react-hot-toast";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getUserFromLocalStorage } from "@/helpers/getUserFromLocalStorage";
import { User } from "@/app/search/page";
import { Skeleton } from "./ui/skeleton";
import Post from "./Post";
import { PostType } from "@/app/page";
import Link from "next/link";

export default function CreatePost() {
	const [loading, setLoading] = useState(false);
	const [refresh, setRefresh] = useState(false);
	const [postLoading, setPostLoading] = useState(false);
	const [posts, setPosts] = useState<PostType[]>([]);
	const [postContent, setPostContent] = useState("");
	const [image, setImage] = useState<string | File>("");
	const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
	const [isEmojiModalOpen, setIsEmojiModalOpen] = useState(false);
	const [emojis, setEmojis] = useState([
		"😀",
		"😃",
		"😄",
		"😁",
		"😆",
		"😅",
		"😂",
		"🤣",
		"🥲",
		"☺️",
		"😊",
		"😇",
		"🙂",
		"🙃",
		"😉",
		"😌",
		"😍",
		"🥰",
		"😘",
		"😗",
		"😙",
		"😚",
		"😋",
		"😛",
		"😝",
		"😜",
		"🤪",
		"🤨",
		"🧐",
		"🤓",
	]);

	const handleEmojiSelect = (emoji: any) => {
		setPostContent(postContent + emoji);
		setIsEmojiModalOpen(false);
	};

	const uploadFile = async () => {
		const data = new FormData();
		if (!image) return "";
		data.append("file", image);
		data.append("upload_preset", "images-preset");
		try {
			const cloudname = process.env.NEXT_PUBLIC_CLOUDINARY_NAME;
			const resourceType = "image";
			const api = `https://api.cloudinary.com/v1_1/${cloudname}/${resourceType}/upload`;
			const res = await axios.post(api, data);
			const { secure_url } = res.data;
			return secure_url;
		} catch (error) {
			console.log(error);
			return "";
		}
	};

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		const picUrl = await uploadFile();
		if (postContent === "" && picUrl === "") {
			toast.success("Write something to post!");
			return;
		}
		const data = {
			postContent,
			image: picUrl,
		};

		try {
			setPostLoading(true);
			const res = await axios.post("/api/posts/createpost", data);
			if (res.data.success) {
				await getNewPost();
			}
			if (!res.data.success) {
				toast("Something Went Wront! Please Try Again Letter");
			}
			toast.success("Post Published successfully");
			setPostLoading(false);
			setPostContent("");
			setImage("");
		} catch (error: any) {
			setPostLoading(false);
			throw new Error(error);
		}
	};
	useEffect(() => {
		const userData = getUserFromLocalStorage();
		if (userData) {
			setLoggedInUser(userData);
		}
	}, []);

	const getNewPost = async () => {
		try {
			const response = await axios.get("/api/posts/getallposts");
			if (!response.data.success) {
				toast(response.data.message);
			}
			setPosts(response.data.posts);
		} catch (error: any) {
			console.log(error);
			throw new Error(error);
		}
	};

	const getAllPosts = async () => {
		try {
			setLoading(true);
			const response = await axios.get("/api/posts/getallposts");
			if (!response.data.success) {
				toast(response.data.message);
			}
			setPosts(response.data.posts);
			setLoading(false);
		} catch (error: any) {
			console.log(error);
			setLoading(false);
			throw new Error(error);
		}
	};
	useEffect(() => {
		getAllPosts();
	}, []);

	useEffect(() => {
		getNewPost();
	}, [refresh]);

	const allPosts = posts
		.slice()
		.sort(
			(a, b) =>
				new Date(b.createdAt).getTime() -
				new Date(a.createdAt).getTime()
		);

	const handleDeletePost = (postId: string) => {
		setPosts(posts.filter((post) => post?._id !== postId));
	};

	return (
		<div className='m-auto pb-2 lg:w-[900px] md:w-[900px]'>
			<div className='bg-white dark:bg-gray-950 rounded-lg shadow-md p-4 sm:p-6 flex min-h-sm relative justify-center pt-5 '>
				<div className='mr-4 mt-4'>
					<Link href={`/profile/${loggedInUser?._id}`}>
						<Avatar className='md:h-14 h-11 md:w-14 w-11'>
							<AvatarImage
								src={loggedInUser?.profilepic}
								className='object-cover cursor-pointer'
							/>
							<AvatarFallback>
								{loggedInUser?.name.charAt(0)}
							</AvatarFallback>
						</Avatar>
					</Link>
				</div>
				<div className='flex flex-col gap-4 w-full'>
					<Textarea
						value={postContent}
						onChange={(e: any) => setPostContent(e.target.value)}
						placeholder="What's in your mind?"
						className='w-full resize-none border-gray-200 dark:border-gray-800 rounded-lg md:p-4 p-2 focus:outline-none focus:ring-2 focus:ring-gray-950 dark:focus:ring-gray-300'
						rows={2}
					/>
					<div className='flex items-center justify-between'>
						<div className='flex items-center'>
							<div className='flex items-center gap-2'>
								<input
									type='file'
									accept='image/*'
									className='hidden'
									id='profile-photo'
									onChange={(e: any) =>
										setImage(e.target.files[0])
									}
								/>
								<label
									htmlFor='profile-photo'
									className='text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 cursor-pointer'>
									<FaRegImage className='w-6 h-6 mx-3' />
								</label>
								{image && (
									<div className='flex items-center gap-2'>
										<img
											src={
												typeof image === "string"
													? image
													: URL.createObjectURL(image)
											}
											alt='Post image'
											width={40}
											height={40}
											className='rounded-lg'
										/>
										<Button
											variant='ghost'
											size='icon'
											className='text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'>
											<RxCross2
												className='w-4 h-4'
												onClick={() => setImage("")}
											/>
											<span className='sr-only'>
												Remove image
											</span>
										</Button>
									</div>
								)}
							</div>
							<Button
								onClick={() => setIsEmojiModalOpen(true)}
								variant='ghost'
								size='icon'
								className='text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'>
								<BsEmojiSmile className='w-6 h-6' />
								<span className='sr-only'>Add emoji</span>
							</Button>
						</div>
						<Button onClick={handleSubmit}>
							{postLoading ? (
								<div className='flex items-center justify-center'>
									<div className='w-6 h-6 rounded-full border-4 border-gray-400 border-t-white animate-spin' />
								</div>
							) : (
								"+Post"
							)}
						</Button>
					</div>
				</div>
				<Dialog
					open={isEmojiModalOpen}
					onOpenChange={setIsEmojiModalOpen}>
					<DialogContent className='bg-white dark:bg-gray-950 rounded-lg shadow-md p-4 sm:p-6 max-w-md'>
						<div className='flex flex-wrap gap-2 justify-center'>
							{emojis.map((emoji, index) => (
								<Button
									key={index}
									onClick={() => handleEmojiSelect(emoji)}
									variant='ghost'
									size='icon'
									className='text-2xl hover:bg-gray-100 dark:hover:bg-gray-800'>
									{emoji}
								</Button>
							))}
						</div>
					</DialogContent>
				</Dialog>
			</div>
			<div>
				{loading && loading ? (
					<div className='flex flex-col p-4 space-y-3 bg-white my-4 dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm m-auto lg:w-[900px] md:w-[900px]'>
						<div className='space-y-2'>
							<Skeleton className='h-4 w-full' />
							<Skeleton className='h-4 w-full' />
						</div>
						<Skeleton className='h-[450px] w-full rounded-xl' />
					</div>
				) : (
					<div>
						{allPosts &&
							allPosts.map((post) => (
								<Post
									key={post?._id}
									data={post}
									onDeletePost={handleDeletePost}
									onRefresh={setRefresh}
								/>
							))}
					</div>
				)}
			</div>
		</div>
	);
}
