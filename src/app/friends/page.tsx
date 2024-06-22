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

export default function Friends() {
	const [searchTerm, setSearchTerm] = useState("");
	const [loading, setLoading] = useState(false);
	const [friends, setFriends] = useState<User[]>([]);
	const [filteredFriends, setFilteredFriends] = useState<User[]>([]);
	const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

	useEffect(() => {
		const userData = getUserFromLocalStorage();
		if (userData) {
			setLoggedInUser(userData);
		}
	}, []);

	const userId = loggedInUser?._id;

	const getProfile = async () => {
		try {
			if (!userId) return;
			setLoading(true);
			const response = await axios.post("/api/users/getfriends", {
				userId,
			});
			const { followers, following } = response.data.data;
			const allFriends = [...followers, ...following];

			setFriends(allFriends);
			setFilteredFriends(allFriends);
			setLoading(false);
		} catch (error: any) {
			console.error(error);
			setLoading(false);
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
				{filteredFriends.map((friend: User) => (
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
							<Button size='sm'>Unfollow</Button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
