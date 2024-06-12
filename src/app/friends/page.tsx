"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { IoSearch } from "react-icons/io5";
import { FiMessageCircle } from "react-icons/fi";

export default function Friends() {
	const friends = [
		{
			id: 1,
			name: "Sofia Davis",
			avatar: "/placeholder-user.jpg",
			username: "@sofiadavis",
		},
		{
			id: 2,
			name: "Alex Johnson",
			avatar: "/alex-avatar.jpg",
			username: "@alexjohnson",
		},
		{
			id: 3,
			name: "Maria Gonzalez",
			avatar: "/maria-avatar.jpg",
			username: "@maria",
		},
		{
			id: 4,
			name: "Kevin Brown",
			avatar: "/kevin-avatar.jpg",
			username: "@kevin",
		},
		{
			id: 5,
			name: "Lily White",
			avatar: "/lily-avatar.jpg",
			username: "@lilywhite",
		},
		{
			id: 6,
			name: "John Doe",
			avatar: "/placeholder-user.jpg",
			username: "@johndoe",
		},
		{
			id: 7,
			name: "Jane Smith",
			avatar: "/placeholder-user.jpg",
			username: "@jonesmith",
		},
		{
			id: 8,
			name: "Michael Johnson",
			avatar: "/placeholder-user.jpg",
			username: "@michael",
		},
		{
			id: 9,
			name: "Emily Davis",
			avatar: "/placeholder-user.jpg",
			username: "@emilydavis",
		},
		{
			id: 10,
			name: "David Lee",
			avatar: "/placeholder-user.jpg",
			username: "Away",
		},
	];
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredFriends, setFilteredFriends] = useState(friends);
	const handleSearch = (e: any) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		setFilteredFriends(
			friends.filter((friend) => friend.name.toLowerCase().includes(term))
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
				{filteredFriends.map((friend) => (
					<div
						key={friend.id}
						className='flex items-center justify-between bg-gray-100 dark:bg-gray-800 rounded-lg p-4'>
						<div className='flex items-center gap-4'>
							<Avatar>
								<AvatarImage src='https://github.com/shadcn.png' />
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
							<div className='grid gap-0.5'>
								<p className='text-sm font-medium'>
									{friend.name}
								</p>
								<p className='text-xs text-gray-500 dark:text-gray-400'>
									{friend.username}
								</p>
							</div>
						</div>
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
