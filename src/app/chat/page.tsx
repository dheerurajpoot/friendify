"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { IoSearch } from "react-icons/io5";
import { FiMessageCircle } from "react-icons/fi";
import { getUserFromLocalStorage } from "@/helpers/getUserFromLocalStorage";
import { User } from "../search/page";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { getUserProfile } from "@/helpers/getUserProfile";

export default function Chat() {
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredFriends, setFilteredFriends] = useState<User[]>([]);
	const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(false);
	const [friends, setFriends] = useState<User[]>([]);
	const router = useRouter();

	// handle search friends
	const handleSearch = (e: any) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		setFilteredFriends(
			friends.filter((friend) => friend.name.toLowerCase().includes(term))
		);
	};

	// getting loggedIn user from localstorage
	useEffect(() => {
		const userData = getUserFromLocalStorage();
		if (userData) {
			setLoggedInUser(userData);
		}
	}, []);

	const userId = loggedInUser?._id;

	// create conversion between two friends
	const createConversation = async (userId2: string) => {
		try {
			setLoading(true);
			const response = await axios.post("/api/conversation", {
				userId1: userId,
				userId2,
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

	let chatUsers: any = [];
	const getConversation = async () => {
		try {
			setLoading(true);
			if (!userId) return;
			const response = await axios.post("/api/getconversation", {
				userId,
			});
			const conversation = response.data.conversation;
			let participants: any = [];

			conversation.map((item: any) =>
				participants.push(
					item.participants.filter((id: string) => id !== userId)[0]
				)
			);

			for (const id of participants) {
				const chatUserProfile = await getUserProfile(id);

				if (chatUserProfile.status === 400) return;

				chatUsers.push(chatUserProfile.data);
			}
			setLoading(false);
			const users = chatUsers.reverse();
			setFilteredFriends(users);
			setFriends(chatUsers);
		} catch (error: any) {
			setLoading(false);
			console.log(error);
			throw new Error(error);
		}
	};
	useEffect(() => {
		getConversation();
	}, [userId]);

	return (
		<div className='flex flex-col w-full max-w-4xl mx-auto p-4 md:p-6 shadow max-h-screen h-[calc(100vh-180px)] overflow-auto'>
			<div className='flex items-center justify-between mb-4'>
				<h1 className='text-2xl font-bold'>Message</h1>
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
			<hr className='mb-3' />
			{filteredFriends && filteredFriends.length == 0 ? (
				<span className='text-center'>
					You don't have any friend to chat.
				</span>
			) : (
				<div className='grid gap-4 p-2'>
					{loading ? (
						<div>
							<Skeleton className='h-16 w-full my-4' />
							<Skeleton className='h-16 w-full my-4' />
						</div>
					) : (
						filteredFriends &&
						filteredFriends.map((friend) => (
							<div
								onClick={() => createConversation(friend?._id)}
								key={friend?._id}
								className='flex items-center justify-between bg-gray-100 hover:bg-blue-100 dark:bg-gray-800 rounded-lg p-4 cursor-pointer'>
								<div className='flex items-center gap-4'>
									<Avatar>
										<AvatarImage
											src={friend?.profilepic}
											className='object-cover'
										/>
										<AvatarFallback>
											{friend?.name.charAt(0)}
										</AvatarFallback>
									</Avatar>
									<div className='grid gap-0.5'>
										<p className='text-sm font-medium'>
											{friend?.name}
										</p>
										<p className='text-xs text-gray-500 dark:text-gray-400'>
											{/* {friend.status} */}
											onliine
										</p>
									</div>
								</div>
								<div className='flex items-center gap-2'>
									<Button variant='outline' size='icon'>
										<FiMessageCircle className='h-4 w-4' />
										<span className='sr-only'>
											Message {friend?.name}
										</span>
									</Button>
								</div>
							</div>
						))
					)}
				</div>
			)}
		</div>
	);
}
