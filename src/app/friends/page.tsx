"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
	const [followingFriends, setFollowingFriends] = useState<User[]>([]);
	const [followerFriends, setFollowerFriends] = useState<User[]>([]);
	const [filteredFriends, setFilteredFriends] = useState<User[]>([]);
	const [filteredFollowerFriends, setFilteredFollowerFriends] = useState<
		User[]
	>([]);
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
			const followingUser = response?.data?.data?.following;
			const followersUser = response?.data?.data?.followers;

			if (followingUser.length === 0 && followersUser.length === 0)
				return;
			setFollowingFriends(followingUser);
			setFollowerFriends(followersUser);
			setFilteredFriends(followingUser);
			setFilteredFollowerFriends(followersUser);
			setLoading(false);
		} catch (error: any) {
			setLoading(false);
			throw new Error(error);
		}
	};

	useEffect(() => {
		getFriends();
	}, [loggedInUser, userId, getFriends]);

	const handleSearch = (e: any) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		setFilteredFriends(
			followingFriends.filter((friend: User) =>
				friend.name.toLowerCase().includes(term)
			)
		);
		setFilteredFollowerFriends(
			followerFriends.filter((friend: User) =>
				friend.name.toLowerCase().includes(term)
			)
		);
	};

	const toProfile = (fId: string) => {
		router.push(`/profile/${fId}`);
	};
	const toMessage = (fId: string) => {
		router.push(`/chat`);
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
			{/* tabs  */}
			<Tabs defaultValue='following' className='w-full'>
				<TabsList className='w-full justify-around'>
					<TabsTrigger value='following' className='border-2'>
						Following
					</TabsTrigger>
					<div className='border border-gray h-full'></div>
					<TabsTrigger value='followers' className='border-2'>
						Followers
					</TabsTrigger>
				</TabsList>
				<TabsContent value='following'>
					{/* following */}
					<div className='grid gap-4'>
						{filteredFriends.length == 0 ? (
							<span className='text-center'>
								You are not following to anyone.
							</span>
						) : (
							filteredFriends?.map((friend: User) => (
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
											onClick={() =>
												toMessage(friend?._id)
											}>
											<FiMessageCircle className='w-4 h-4 md:mr-2' />
											<span className='hidden md:block'>
												Message
											</span>
										</Button>
										<Button
											size='sm'
											onClick={() =>
												toProfile(friend?._id)
											}>
											<CgProfile className='w-4 h-4 md:mr-2' />
											<span className='hidden md:block'>
												View Profile
											</span>
										</Button>
									</div>
								</div>
							))
						)}
					</div>
				</TabsContent>
				<TabsContent value='followers'>
					{/* followers */}
					<div className='grid gap-4'>
						{filteredFollowerFriends.length == 0 ? (
							<span className='text-center'>
								You have 0 followers
							</span>
						) : (
							filteredFollowerFriends?.map((friend: User) => (
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
											onClick={() =>
												toMessage(friend?._id)
											}>
											<FiMessageCircle className='w-4 h-4 md:mr-2' />
											<span className='hidden md:block'>
												Message
											</span>
										</Button>
										<Button
											size='sm'
											onClick={() =>
												toProfile(friend?._id)
											}>
											<CgProfile className='w-4 h-4 md:mr-2' />
											<span className='hidden md:block'>
												View Profile
											</span>
										</Button>
									</div>
								</div>
							))
						)}
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
