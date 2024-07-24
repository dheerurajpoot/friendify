"use client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { HiOutlineDotsVertical } from "react-icons/hi";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import axios from "axios";
import { getUserFromLocalStorage } from "@/helpers/getUserFromLocalStorage";
import { User } from "@/app/search/page";
import { IoMdArrowRoundBack } from "react-icons/io";
import { format } from "timeago.js";
import { socket } from "./../../../../socket";

interface MessageInterface {
	id: string;
	text: string;
}

export default function Message({ params }: { params: { chatId: string } }) {
	const conversationId = params.chatId;
	const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
	const [messageText, setMessageText] = useState("");
	const [messages, setMessages] = useState<MessageInterface[]>([]);
	const [receiverId, setReceiverId] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [receiverUser, setReceiverUser] = useState<User>();
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const [onlineUsers, setOnlineUsers] = useState<[] | any>(null);

	// getting loggedIn user from localstorage
	useEffect(() => {
		const userData = getUserFromLocalStorage();
		if (userData) {
			setLoggedInUser(userData);
		}
	}, []);

	// getting messages from database
	const fetchMessages = async () => {
		if (!loggedInUser) return;
		try {
			const res = await axios.get(
				`/api/getmessage?conversationId=${conversationId}`
			);
			setMessages(res.data.messages);
			const conversation = res.data.conversation;
			const receiver = conversation.participants.find(
				(id: string) => id !== loggedInUser?._id
			);
			setReceiverId(receiver);
		} catch (error: any) {
			console.error(error.message);
		}
	};

	useEffect(() => {
		if (loggedInUser) {
			fetchMessages();
		}
	}, [loggedInUser, conversationId]);

	// getting messages from socket
	useEffect(() => {
		const handleNewMessage = (newMsg: any) => {
			setMessages((prevMessages) => [...prevMessages, newMsg]);
		};
		socket.on("chat message", handleNewMessage);

		return () => {
			socket.off("chat message", handleNewMessage);
		};
	}, []);

	// Send messages to database
	const sendMessage = async () => {
		if (!messageText.trim() || !receiverId) return;
		try {
			const msgData = {
				sender: loggedInUser?._id,
				receiver: receiverId,
				content: messageText,
				conversationId,
			};
			const res = await axios.post("/api/sendmessage", msgData);

			if (res.data.success) {
				setMessageText("");
				socket.emit("chat message", msgData);
				fetchMessages();
			}
		} catch (error: any) {
			console.error(error);
		}
	};

	// Get receiver user profile
	const getProfile = async () => {
		if (!receiverId) return;

		try {
			setLoading(true);
			const response = await axios.post("/api/users/profile", {
				userId: receiverId,
			});
			setReceiverUser(response?.data?.data);
			setLoading(false);
		} catch (error: any) {
			throw new Error(error);
		}
	};

	useEffect(() => {
		if (!receiverId) return;
		getProfile();
	}, [conversationId, messages, receiverId]);

	useEffect(() => {
		socket.on("online users", (users) => {
			setOnlineUsers(users);
		});
	}, [conversationId]);

	// scroll to view
	useLayoutEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
	}, [messages]);

	return (
		<div className='flex flex-col w-full md:h-[calc(100vh-170px)] h-[calc(100vh-270px)] mt-[-12px] rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden m-auto lg:w-[900px] md:w-[900px]'>
			<div className='bg-gray-100 dark:bg-gray-900 px-4 py-3 flex items-center justify-between'>
				<div className='flex items-center gap-3'>
					<Link href={"/chat"}>
						<Button
							variant='ghost'
							size='icon'
							className='rounded-full'>
							<IoMdArrowRoundBack className='w-5 h-5 text-gray-500 dark:text-gray-400' />
						</Button>
					</Link>
					<Link href={`/profile/${receiverId}`}>
						<Avatar>
							<AvatarImage
								src={receiverUser?.profilepic}
								className='object-cover'
							/>
							<AvatarFallback>
								{receiverUser?.name.charAt(0)}
							</AvatarFallback>
						</Avatar>
					</Link>
					<div>
						<div className='font-medium'>{receiverUser?.name}</div>
						<div className='text-sm text-gray-500 dark:text-gray-400'>
							{onlineUsers?.includes(receiverId)
								? "Online"
								: "Offline"}
						</div>
					</div>
				</div>
				<div className='flex items-center gap-2'>
					{/* <Button
						variant='ghost'
						size='icon'
						className='rounded-full'>
						<IoSearch className='w-5 h-5 text-gray-500 dark:text-gray-400' />
					</Button> */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant='ghost'
								size='icon'
								className='rounded-full'>
								<HiOutlineDotsVertical className='h-6 w-6' />
								<span className='sr-only'>More options</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							<Link href={`/profile/${receiverUser?._id}`}>
								<DropdownMenuItem className='cursor-pointer'>
									<FaUserCheck className='h-4 w-4 mr-2' />
									View Profile
								</DropdownMenuItem>
							</Link>
							{/* <DropdownMenuItem className='cursor-pointer'>
								<FaRegTrashAlt className='h-4 w-4 mr-2' />
								Clear Chat
							</DropdownMenuItem> */}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
			{messages.length === 0 ? (
				<div className='flex-1 overflow-auto p-4 space-y-4 text-center'>
					<span>Type to start chat!</span>
				</div>
			) : (
				<div className='flex-1 overflow-auto p-4 space-y-4'>
					{messages.map((msg: any, index) => (
						<div
							key={index}
							className={`flex items-start gap-3 ${
								msg.sender === loggedInUser?._id
									? "justify-end"
									: ""
							}`}>
							{msg.sender !== loggedInUser?._id && (
								<Link href={`/profile/${receiverUser?._id}`}>
									<Avatar>
										<AvatarImage
											src={receiverUser?.profilepic}
											className='object-cover'
										/>
										<AvatarFallback>
											{receiverUser?.name.charAt(0)}
										</AvatarFallback>
									</Avatar>
								</Link>
							)}
							<div
								className={`bg-gray-100 dark:bg-gray-800 rounded p-2 max-w-[70%] ${
									msg.sender === loggedInUser?._id
										? "bg-blue-200 dark:bg-blue-900"
										: ""
								}`}>
								<p className='text-sm md:text-base'>
									{msg.content}
								</p>
								<div className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
									{format(msg?.createdAt)}
								</div>
							</div>
							{msg.sender === loggedInUser?._id && (
								<Link href={`/profile/${msg.sender}`}>
									<Avatar>
										<AvatarImage
											src={loggedInUser?.profilepic}
											className='object-cover'
										/>
										<AvatarFallback>
											{loggedInUser?.name.charAt(0)}
										</AvatarFallback>
									</Avatar>
								</Link>
							)}
						</div>
					))}
					<div ref={messagesEndRef} />
				</div>
			)}
			<div className='bg-gray-100 dark:bg-gray-900 px-4 py-3 flex items-center gap-2'>
				<Input
					type='text'
					placeholder='Type your message...'
					value={messageText}
					onChange={(e) => setMessageText(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							e.preventDefault();
							sendMessage();
						}
					}}
					className='flex-1 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
				/>
				<Button onClick={sendMessage}>Send</Button>
			</div>
		</div>
	);
}
