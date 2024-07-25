"use client";

import { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { getUserFromLocalStorage } from "@/helpers/getUserFromLocalStorage";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { IoSearch } from "react-icons/io5";
import { Skeleton } from "@/components/ui/skeleton";

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

	const getAllUsers = async (searchTerm: string) => {
		try {
			setLoading(true);
			const response = await axios.get("/api/users/getallusers");
			setUsers(response.data.users || []);
			setLoading(false);
		} catch (error: any) {
			throw new Error(error);
		}
	};

	useEffect(() => {
		if (searchTerm) {
			getAllUsers(searchTerm);
		} else {
			setUsers([]);
		}
	}, [searchTerm]);

	useEffect(() => {
		const userData = getUserFromLocalStorage();
		if (userData) {
			setLoggedInUser(userData);
		}
	}, []);

	const searchedUsers = useMemo(() => {
		return filteredUsers.filter(
			(user: User) => user?._id !== loggedInUser?._id
		);
	}, [filteredUsers, loggedInUser]);

	return (
		<div className='bg-white dark:bg-gray-950 rounded-lg overflow-auto shadow-md p-4 mx-auto lg:w-[900px] md:w-[900px] max-h-screen md:h-[calc(100vh-180px)] h-[calc(100vh-270px)]'>
			<div className='flex items-center justify-between mb-4'>
				<h1 className='text-2xl font-bold'>Search</h1>
				<div className='relative'>
					<IoSearch className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400' />
					<Input
						type='text'
						placeholder='Search for users'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className='pl-8 w-[200px] md:w-[300px]'
					/>
				</div>
			</div>
			<hr />
			{!searchTerm && (
				<div className='flex h-[70%] justify-center items-center'>
					<p>Start typing to search your friend...</p>
				</div>
			)}
			{loading && (
				<div>
					<Skeleton className='h-16 w-full my-4' />
				</div>
			)}
			{!loading && searchTerm && (
				<div className='space-y-4'>
					{searchedUsers.length === 0 ? (
						<p>No users found.</p>
					) : (
						searchedUsers.map((user: any) => (
							<div
								key={user._id}
								className='flex items-center justify-between bg-gray-100 hover:bg-blue-100 cursor-pointer dark:bg-gray-800 rounded-lg p-4'>
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
											<h3 className='font-medium'>
												{user.name}{" "}
												{user.isAdmin && (
													<img
														src='/path-to-blue-tick-icon.png'
														alt='Admin'
														className='inline-block w-4 h-4'
													/>
												)}
											</h3>
										</div>
									</div>
								</Link>
								<div className='flex items-center gap-2'>
									<Link href={`/profile/${user?._id}`}>
										<Button size='sm'>
											<CgProfile className='w-4 h-4 md:mr-2' />
											<span className='hidden md:block'>
												View Profile
											</span>
										</Button>
									</Link>
								</div>
							</div>
						))
					)}
				</div>
			)}
		</div>
	);
}
