"use client";
import React, { useEffect, useState } from "react";
import ProfilePic from "./../../../../public/post.jpg";
import Post from "@/components/Post";
import Link from "next/link";
import { FaEdit, FaUserCheck } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoMailOpenOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { FiMessageCircle } from "react-icons/fi";
import { FiUserPlus } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-hot-toast";
import { format } from "timeago.js";
import { getUserFromLocalStorage } from "@/helpers/getUserFromLocalStorage";
import { PostType } from "@/app/page";
import { User } from "@/app/search/page";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

const Profile = ({ params }: { params: { userid: string } }) => {
	const [loading, setLoading] = useState(false);
	const [refresh, setRefresh] = useState(false);
	const [user, setUser] = useState<User>();
	const [posts, setPosts] = useState<PostType[]>([]);
	const [loggedInUser, setLoggedInUser] = useState<User | any>(null);
	const router = useRouter();

	useEffect(() => {
		const userData = getUserFromLocalStorage();
		if (userData) {
			setLoggedInUser(userData);
		}
	}, []);

	const userId = params.userid;
	const getProfile = async () => {
		try {
			setLoading(true);
			const response = await axios.post("/api/users/profile", { userId });
			setUser(response?.data?.data);
			setLoading(false);
		} catch (error: any) {
			throw new Error(error);
		}
	};
	useEffect(() => {
		getProfile();
	}, [userId]);

	const getAllPosts = async () => {
		try {
			setLoading(true);
			const response = await axios.get("/api/posts/getallposts");
			setPosts(response.data.posts);
			setLoading(false);
		} catch (error: any) {
			throw new Error(error);
		}
	};

	useEffect(() => {
		getAllPosts();
	}, []);

	const profilePosts =
		posts?.filter((post: PostType) => post.createdBy?._id === user?._id) ||
		[];
	const userposts = profilePosts
		.slice()
		.sort(
			(a, b) =>
				new Date(b.createdAt).getTime() -
				new Date(a.createdAt).getTime()
		);

	const handleDeletePost = (postId: string) => {
		setPosts(posts.filter((post) => post?._id !== postId));
	};

	const handleFollow = async () => {
		try {
			const response = await axios.put("/api/users/followunfollow", {
				id: user?._id,
			});
			getUserProfile();
			if (response.data.success) {
				toast.success(response.data.message);
			} else {
				toast.error(response.data.message);
			}
		} catch (error: any) {
			toast.error("Something went wrong");
			console.error(error);
		}
	};

	const getUserProfile = async () => {
		try {
			const response = await axios.post("/api/users/profile", { userId });
			setUser(response?.data?.data);
		} catch (error: any) {
			throw new Error(error);
		}
	};

	// create conversion between two friends
	const createConversation = async () => {
		try {
			setLoading(true);
			const response = await axios.post("/api/conversation", {
				userId1: loggedInUser?._id,
				userId2: userId,
			});

			if (response?.data?.success) {
				router.push(
					`/chat/message/${response?.data?.conversation?._id}`
				);
			}
			setLoading(false);
		} catch (error: any) {
			setLoading(false);
			console.log(error);
			throw new Error(error);
		}
	};

	return (
		<div className='flex pt-4 flex-col relative items-center m-auto overflow-auto lg:w-[900px] md:w-[900px] md:h-[calc(100vh-180px)] h-[calc(100vh-270px)]'>
			<Card className='w-full mx-auto'>
				<div className='relative'>
					<CardHeader className='bg-gray-100 dark:bg-gray-800 h-72 relative overflow-hidden'>
						<Image
							src={ProfilePic || ""}
							alt='Banner'
							width={800}
							height={400}
							className='object-cover w-full h-full'
						/>
						<div className='absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
							<Avatar className='w-44 h-44 border-4 border-white dark:border-gray-950'>
								<AvatarImage
									src={user?.profilepic!}
									className='object-cover'
								/>
								<AvatarFallback>
									{user?.name.charAt(0) || "U"}
								</AvatarFallback>
							</Avatar>
						</div>
					</CardHeader>
				</div>
				<CardContent className='p-6 md:px-20'>
					{loading && loading ? (
						<div className='flex flex-col p-4 space-y-3'>
							<div className='space-y-2'>
								<Skeleton className='h-6 w-full' />
								<Skeleton className='h-6 w-full' />
								<Skeleton className='h-6 w-full' />
								<Skeleton className='h-6 w-full' />
							</div>
						</div>
					) : (
						<div className='grid gap-2'>
							<div className='flex items-center justify-between'>
								<h2 className='text-2xl font-bold'>
									{user?.name}
								</h2>
								{userId === loggedInUser?._id && (
									<Link href={"/updateprofile"}>
										<Button
											variant='outline'
											className='flex items-center justify-center'>
											<FaEdit className='md:mr-2 h-4 w-4' />
											<span className='hidden md:block'>
												Edit Profile
											</span>
										</Button>
									</Link>
								)}
							</div>
							<p className='text-gray-500 dark:text-gray-400'>
								{user?.profession}
							</p>
							<Separator className='my-4' />
							<div className='grid gap-4'>
								<div className='flex items-center gap-2'>
									<IoMailOpenOutline className='w-5 h-5 text-gray-500 dark:text-gray-400' />
									<span className='text-gray-500 dark:text-gray-400'>
										{user?.email}
									</span>
								</div>
								<div className='flex items-center gap-2'>
									<SlCalender className='w-5 h-5 text-gray-500 dark:text-gray-400' />
									<span className='text-gray-500 dark:text-gray-400'>
										{format(user?.createdAt)}
									</span>
								</div>
								{user?.about && (
									<div className='flex items-start gap-2'>
										<FaUserCheck className='w-5 h-5 text-gray-500 dark:text-gray-400 mt-1' />
										<div>
											<p className='text-gray-500 dark:text-gray-400'>
												{user?.about}
											</p>
										</div>
									</div>
								)}
							</div>
							{userId !== loggedInUser?._id && (
								<div className='flex items-center justify-center gap-8 mt-4'>
									<Button
										onClick={createConversation}
										variant='outline'
										size='sm'>
										<FiMessageCircle className='w-4 h-4 mr-2' />
										Message
									</Button>
									<Button size='sm' onClick={handleFollow}>
										{user?.followers.includes(
											loggedInUser?._id
										) ? (
											<>
												<FaUserCheck className='w-4 h-4 mr-2' />
												Unfollow
											</>
										) : (
											<>
												<FiUserPlus className='w-4 h-4 mr-2' />
												Follow
											</>
										)}
									</Button>
								</div>
							)}
						</div>
					)}
				</CardContent>
			</Card>
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
					{userposts && userposts.length !== 0 && !loading ? (
						userposts.map((post) => (
							<Post
								key={post?._id}
								data={post}
								onDeletePost={handleDeletePost}
								onRefresh={setRefresh}
							/>
						))
					) : (
						<p className='mt-10'>No posts available! </p>
					)}
				</div>
			)}
		</div>
	);
};

export default Profile;
