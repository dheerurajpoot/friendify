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
import { useRouter } from "next/navigation";
import { CgProfile } from "react-icons/cg";

export default function Friends() {
	const [searchTerm, setSearchTerm] = useState("");
	const [loading, setLoading] = useState(false);
	const [friends, setFriends] = useState<User[]>([]);
	const [filteredFriends, setFilteredFriends] = useState<User[]>([]);
	const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
	const router = useRouter();
	useEffect(() => {
		const userData = getUserFromLocalStorage();
		if (userData) {
			setLoggedInUser(userData);
		}
	}, []);

	const userId = loggedInUser?._id;

	const getFriends = async () => {
		try {
			if (!userId) return;
			setLoading(true);
			const response = await axios.post("/api/users/getfriends", {
				userId,
			});
			// const { followers, following } = response.data.data;
			// const allFriends = [...followers, ...following];
			const followingUser = response?.data?.data?.following;

			if (followingUser.length === 0) return;
			setFriends(followingUser);
			setFilteredFriends(followingUser);
			setLoading(false);
		} catch (error: any) {
			setLoading(false);
			throw new Error(error);
		}
	};

	useEffect(() => {
		getFriends();
	}, [loggedInUser, userId]);

	const handleSearch = (e: any) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		setFilteredFriends(
			friends.filter((friend: User) =>
				friend.name.toLowerCase().includes(term)
			)
		);
	};

	const toProfile = (fId: string) => {
		router.push(`/profile/${fId}`);
	};
	const toMessage = (fId: string) => {
		router.push(`/message/${fId}`);
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
									<AvatarImage
										src={friend.profilepic}
										className='object-cover'
									/>
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
							<Button
								variant='outline'
								size='sm'
								onClick={() => toMessage(friend?._id)}>
								<FiMessageCircle className='w-4 h-4 mr-2' />
								Message
							</Button>
							<Button
								size='sm'
								onClick={() => toProfile(friend?._id)}>
								<CgProfile className='w-4 h-4 mr-2' />
								View Profile
							</Button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
