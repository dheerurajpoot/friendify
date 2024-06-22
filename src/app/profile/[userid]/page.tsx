"use client";
import React, { useEffect, useState } from "react";
import ProfilePic from "./../../../../public/post.jpg";
import Post from "@/components/Post";
import Link from "next/link";
import { FaUserCheck } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoMailOpenOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { Separator } from "@/components/ui/separator";
import { IoSettingsOutline } from "react-icons/io5";
import Image from "next/image";
import { FiMessageCircle } from "react-icons/fi";
import { FiUserPlus } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { format } from "timeago.js";
import { getUserFromLocalStorage } from "@/helpers/getUserFromLocalStorage";
import { PostType } from "@/app/page";

interface User {
	name: string;
	email: string;
	createdAt: any;
	about: string;
	profilepic: string;
	profession: string;
	_id: string;
	followers: string[];
	following: string[];
}

const Profile = ({ params }: any) => {
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState<User>();
	const [posts, setPosts] = useState<PostType[]>([]);
	const [isFollowing, setIsFollowing] = useState(false);
	const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
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
			setIsFollowing(
				response?.data?.data?.followers?.includes(loggedInUser?._id)
			);
			setLoading(false);
		} catch (error: any) {
			throw new Error(error);
		}
	};

	useEffect(() => {
		getProfile();
	}, []);

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
		posts?.filter((post: any) => post.createdBy._id === user?._id) || [];
	const userposts = profilePosts
		.slice()
		.sort(
			(a, b) =>
				new Date(b.createdAt).getTime() -
				new Date(a.createdAt).getTime()
		);

	const handleFollow = async () => {
		try {
			setLoading(true);
			const response = await axios.put("/api/users/followunfollow", {
				id: user?._id,
			});
			if (response.data.success) {
				setIsFollowing(!isFollowing);
				toast.success(response.data.message);
			} else {
				toast.error(response.data.error);
			}
			setLoading(false);
		} catch (error: any) {
			toast.error("Something went wrong");
			setLoading(false);
		}
	};

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
								<AvatarImage
									src={user?.profilepic!}
									className='object-cover'
								/>
								<AvatarFallback>JD</AvatarFallback>
							</Avatar>
						</div>
					</CardHeader>
				</div>
				<CardContent className='p-6 px-20'>
					<div className='grid gap-2'>
						<div className='flex items-center justify-between'>
							<h2 className='text-2xl font-bold'>{user?.name}</h2>
							<Link href={"/updateprofile"}>
								<Button
									variant='outline'
									className='flex items-center justify-center'>
									<IoSettingsOutline className='mr-2 h-4 w-4' />
									Edit Profile
								</Button>
							</Link>
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
						<div className='flex items-center justify-center gap-8 mt-4'>
							<Link href={"/chat"}>
								<Button variant='outline' size='sm'>
									<FiMessageCircle className='w-4 h-4 mr-2' />
									Message
								</Button>
							</Link>
							<Button size='sm' onClick={handleFollow}>
								{isFollowing ? (
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
					</div>
				</CardContent>
			</Card>
			{userposts && userposts.length !== 0 ? (
				userposts.map((post) => <Post key={post._id} data={post} />)
			) : (
				<p className='mt-10'>You have not posted yet </p>
			)}
		</div>
	);
};

export default Profile;