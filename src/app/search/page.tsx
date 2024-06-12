"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Search() {
	const [searchTerm, setSearchTerm] = useState("");
	const [users, setUsers] = useState([
		{
			id: 1,
			name: "John Doe",
			profilePicture: "/placeholder.svg?height=40&width=40",
			isFollowing: false,
		},
		{
			id: 2,
			name: "Jane Smith",
			profilePicture: "/placeholder.svg?height=40&width=40",
			isFollowing: true,
		},
		{
			id: 3,
			name: "Bob Johnson",
			profilePicture: "/placeholder.svg?height=40&width=40",
			isFollowing: false,
		},
		{
			id: 4,
			name: "Sarah Lee",
			profilePicture: "/placeholder.svg?height=40&width=40",
			isFollowing: false,
		},
	]);
	const filteredUsers = useMemo(() => {
		return users.filter((user) =>
			user.name.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}, [users, searchTerm]);
	const handleFollow = (userId: any) => {
		setUsers((prevUsers) =>
			prevUsers.map((user) =>
				user.id === userId
					? { ...user, isFollowing: !user.isFollowing }
					: user
			)
		);
	};
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
				{filteredUsers.map((user) => (
					<div
						key={user.id}
						className='flex items-center justify-between bg-gray-100 dark:bg-gray-800 rounded-lg p-4'>
						<div className='flex items-center'>
							<Avatar>
								<AvatarImage src='https://github.com/shadcn.png' />
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
							<div className='ml-4'>
								<h3 className='font-medium'>{user.name}</h3>
							</div>
						</div>
						<div className='flex items-center space-x-4'>
							<Button onClick={() => handleFollow(user.id)}>
								{user.isFollowing ? "Unfollow" : "Follow"}
							</Button>
							<Button variant='outline'>Message</Button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
