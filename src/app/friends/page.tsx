"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { IoSearch } from "react-icons/io5";
import { FiMessageCircle } from "react-icons/fi";
import { User } from "../search/page";
import { getUserFromLocalStorage } from "@/helpers/getUserFromLocalStorage";
import axios from "axios";
import Link from "next/link";
import { FaUserCheck } from "react-icons/fa";
import { FiUserPlus } from "react-icons/fi";
import toast from "react-hot-toast";

export default function Friends() {
	const [searchTerm, setSearchTerm] = useState("");
	const [loading, setLoading] = useState(false);
	const [friends, setFriends] = useState<User[]>([]);
	const [user, setUser] = useState<User>();
	const [filteredFriends, setFilteredFriends] = useState<User[]>([]);
	const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
	const [isFollowing, setIsFollowing] = useState(false);

	useEffect(() => {
		const userData = getUserFromLocalStorage();
		if (userData) {
			setLoggedInUser(userData);
		}
	}, []);

	const userId = loggedInUser?._id;
	const getProfile = async () => {
		try {
			setLoading(true);
			if (!userId) return;
			const response = await axios.post("/api/users/profile", { userId });
			setUser(response?.data?.data);
			const followingUser = response?.data?.data?.following;
			if (followingUser.length === 0) return;
			setFriends(followingUser);
			setFilteredFriends(followingUser);

			setLoading(false);
		} catch (error: any) {
			throw new Error(error);
		}
	};

	useEffect(() => {
		getProfile();
	}, [userId]);

	const handleSearch = (e: any) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		setFilteredFriends(
			friends.filter((friend: User) =>
				friend.name.toLowerCase().includes(term)
			)
		);
	};

	useEffect(() => {
		if (user && loggedInUser) {
			setIsFollowing(user.followers.includes(loggedInUser._id));
		}
	}, [user, loggedInUser]);

	const handleFollow = async (fId: string) => {
		try {
			setLoading(true);
			const response = await axios.put("/api/users/followunfollow", {
				id: fId,
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
		<div className='flex flex-col w-full max-w-4xl mx-auto p-4 md:p-6'>
			<div className='flex items-center justify-between mb-4'>
				<h1 className='text-2xl font-bold'>Friends</h1>
				<div className='relative'>
					<IoSearch className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400' />
					<Input
						type='search'
						placeholder='Search friends...'
						value={searchTerm}
						onChange={handleSearch}
						className='pl-8 w-[200px] md:w-[300px]'
					/>
				</div>
			</div>
			<div className='grid gap-4'>
				{filteredFriends?.map((friend: User) => (
					<div
						key={friend._id}
						className='flex items-center justify-between bg-gray-100 dark:bg-gray-800 rounded-lg p-4'>
						<Link href={`/profile/${friend?._id}`}>
							<div className='flex items-center gap-4'>
								<Avatar>
									<AvatarImage src={friend.profilepic} />
									<AvatarFallback>
										{friend?.name.charAt(0)}
									</AvatarFallback>
								</Avatar>
								<div className='grid gap-0.5'>
									<p className='text-sm font-medium'>
										{friend.name}
									</p>
									<p className='text-xs text-gray-500 dark:text-gray-400'>
										{friend?.username}
									</p>
								</div>
							</div>
						</Link>
						<div className='flex items-center gap-2'>
							<Button variant='outline' size='sm'>
								Message
							</Button>
							<Button
								size='sm'
								onClick={() => handleFollow(friend?._id)}>
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
				))}
			</div>
		</div>
	);
}
