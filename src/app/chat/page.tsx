"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { IoSearch } from "react-icons/io5";
import { FiMessageCircle } from "react-icons/fi";
import { getUserFromLocalStorage } from "@/helpers/getUserFromLocalStorage";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { socket } from "@/socket";
import { User } from "../search/page";

type Chat = {
	_id: string;
	participants: User[];
	updatedAt: string;
};

export default function Chat() {
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredFriends, setFilteredFriends] = useState<Chat[]>([]);
	const [loggedInUser, setLoggedInUser] = useState<User[] | any>([]);
	const [loading, setLoading] = useState(false);
	const [onlineUsers, setOnlineUsers] = useState<User[] | any>([]);
	const router = useRouter();

	// Handle search friends
	const handleSearch = (e: any) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		setFilteredFriends((prev) =>
			prev.filter((friend) =>
				friend.participants.some((user: any) =>
					user.name.toLowerCase().includes(term)
				)
			)
		);
	};

	// Getting loggedIn user from localstorage
	useEffect(() => {
		const userData = getUserFromLocalStorage();
		if (userData) {
			setLoggedInUser(userData);
		}
	}, []);

	const userId = loggedInUser?._id;

	// Get conversations
	const getConversation = async () => {
		try {
			setLoading(true);
			if (!userId) return;
			const response = await axios.post("/api/getconversation", {
				userId,
			});

			const sortedConversations = (
				response.data.conversation as Chat[]
			).sort(
				(a, b) =>
					new Date(b.updatedAt).getTime() -
					new Date(a.updatedAt).getTime()
			);

			setFilteredFriends(sortedConversations);
			setLoading(false);
		} catch (error: any) {
			setLoading(false);
			console.log(error);
			throw new Error(error);
		}
	};

	useEffect(() => {
		getConversation();
	}, [userId]);

	// User online status
	useEffect(() => {
		socket.on("online users", (users) => {
			setOnlineUsers(users);
		});
	}, []);

	const toMessage = (id: any) => {
		router.push(`/chat/message/${id}`);
	};

	return (
		<div className='flex flex-col w-full max-w-4xl mx-auto p-4 md:p-6 shadow max-h-screen md:h-[calc(100vh-180px)] h-[calc(100vh-270px)] overflow-auto'>
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
			{loading ? (
				<div>
					<Skeleton className='h-16 w-full my-4' />
				</div>
			) : (
				<div className='grid gap-4 p-2'>
					{filteredFriends.length === 0 ? (
						<span className='text-center'>No chats available.</span>
					) : (
						<div className='grid gap-4 p-2'>
							{filteredFriends.map((chat) => {
								const receiver = chat.participants.find(
									(user: any) => user?._id !== userId
								);
								return (
									<div
										onClick={() => toMessage(chat?._id)}
										key={chat._id}
										className='flex items-center justify-between bg-gray-100 hover:bg-blue-100 dark:bg-gray-800 rounded-lg p-4 cursor-pointer'>
										<div className='flex items-center gap-4'>
											<Avatar>
												<AvatarImage
													src={receiver?.profilepic}
													className='object-cover'
												/>
												<AvatarFallback>
													{receiver?.name?.charAt(0)}
												</AvatarFallback>
											</Avatar>
											<div className='grid gap-0.5'>
												<p className='text-sm font-medium'>
													{receiver?.name ||
														"Deleted User"}
												</p>
												<p className='text-xs text-gray-500 dark:text-gray-400'>
													{onlineUsers.includes(
														receiver?._id
													)
														? "Online"
														: "Offline"}
												</p>
											</div>
										</div>
										<div className='flex items-center gap-2'>
											<Button
												variant='outline'
												size='icon'>
												<FiMessageCircle className='h-4 w-4' />
											</Button>
										</div>
									</div>
								);
							})}
						</div>
					)}
				</div>
			)}
		</div>
	);
}
