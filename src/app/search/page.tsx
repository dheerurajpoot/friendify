"use client";

import { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { getUserFromLocalStorage } from "@/helpers/getUserFromLocalStorage";
import Link from "next/link";

export interface User {
	name: string;
	username: string;
	email: string;
	createdAt: any;
	about: string;
	profilepic: string;
	profession: string;
	_id: string;
	followers: string[];
	following: string[];
}

export default function Search() {
	const [searchTerm, setSearchTerm] = useState("");
	const [loading, setLoading] = useState(false);
	const [users, setUsers] = useState([]);
	const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

	const filteredUsers = useMemo(() => {
		return users.filter((user: User) =>
			user.name.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}, [users, searchTerm]);

	const handleFollow = (userId: any) => {
		// setUsers((prevUsers) =>
		// 	prevUsers.map((user) =>
		// 		user.id === userId
		// 			? { ...user, isFollowing: !user.isFollowing }
		// 			: user
		// 	)
		// );
	};
	const getAllUsers = async () => {
		try {
			setLoading(true);
			const response = await axios.get("/api/users/getallusers");
			setUsers(response.data.users);
			setLoading(false);
		} catch (error: any) {
			throw new Error(error);
		}
	};
	useEffect(() => {
		getAllUsers();
	}, [searchTerm]);

	useEffect(() => {
		const userData = getUserFromLocalStorage();
		if (userData) {
			setLoggedInUser(userData);
		}
	}, []);

	return (
		<div className='bg-white dark:bg-gray-950 rounded-lg shadow-md p-4 mx-auto lg:w-[900px] md:w-[900px]'>
			<div className='flex items-center mb-4'>
				<Input
					type='text'
					placeholder='Search for users'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className='flex-1 mr-4'
				/>
				<Button>Search</Button>
			</div>
			<div className='space-y-4'>
				{filteredUsers.map((user: any) => (
					<div
						key={user._id}
						className='flex items-center justify-between bg-gray-100 dark:bg-gray-800 rounded-lg p-4'>
						<Link href={`/profile/${user?._id}`}>
							<div className='flex items-center'>
								<Avatar>
									<AvatarImage
										src={user?.profilepic}
										className='object-cover'
									/>
									<AvatarFallback>
										{user?.name.charAt(0)}
									</AvatarFallback>
								</Avatar>
								<div className='ml-4'>
									<h3 className='font-medium'>{user.name}</h3>
								</div>
							</div>
						</Link>
						<div className='flex items-center space-x-4'>
							<Link href={`/profile/${user?._id}`}>
								<Button>View Profile</Button>
							</Link>
							<Link href={`/message/${user?._id}`}>
								<Button variant='outline'>Message</Button>
							</Link>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
