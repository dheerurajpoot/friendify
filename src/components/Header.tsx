"use client";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdOutlineLockReset } from "react-icons/md";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { FaRegTrashAlt } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { MdLogout } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FaEdit } from "react-icons/fa";
import { getUserFromLocalStorage } from "@/helpers/getUserFromLocalStorage";
import { User } from "@/app/search/page";
import logo from "./../../public/hikelogo.png";
import Image from "next/image";

const Header = () => {
	const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
	const router = useRouter();

	const logOut = async () => {
		try {
			const response = await axios.get("/api/users/logout");
			if (response.status === 200) {
				localStorage.removeItem("user");
				toast.success("Logout Successfully");
				router.push("/login");
			} else {
				toast.error("Failed to logout");
			}
		} catch (error: any) {
			toast.error("An error occurred during logout");
			console.error(error);
		}
	};

	useEffect(() => {
		const userData = getUserFromLocalStorage();
		if (userData) {
			setLoggedInUser(userData);
		}
	}, []);

	// delete user profile and data
	const deleteProfile = async () => {
		const confirmed = window.confirm(
			"Are you sure you want to delete your profile? Deleted data can't be recovered again!"
		);
		if (!confirmed) return;
		try {
			const res = await axios.put("/api/users/deleteprofile");
			if (res.status === 200) {
				toast.success(res.data.message);
				setTimeout(() => {
					logOut();
				}, 2000);
			} else {
				toast.error(res.data.message);
			}
		} catch (error: any) {
			toast.error("An error occurred during profile delete");
			console.error(error);
		}
	};

	return (
		<div className='flex fixed top-0 bg-white items-center justify-center z-10 w-full overflow-hidden h-[80px] shadow '>
			<div className='flex justify-between items-center w-[900px] p-4'>
				<div>
					<Link href={`/profile/${loggedInUser?._id}`}>
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
				</div>
				<div>
					<Link href={"/"}>
						{/* <h2 className='text-3xl font-bold'>HikeTok</h2> */}
						<Image
							src={logo}
							height={90}
							width={140}
							alt='HikeTok'
						/>
					</Link>
				</div>

				<div className='relative'>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant='ghost'
								size='icon'
								className='rounded-full relative'>
								<HiOutlineDotsVertical className='h-8 w-8' />
								<span className='sr-only'>More options</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							<Link href={`/profile/${loggedInUser?._id}`}>
								<DropdownMenuItem className='cursor-pointer'>
									<FaRegUserCircle className='h-4 w-4 mr-2' />
									Profile
								</DropdownMenuItem>
							</Link>
							<DropdownMenuSeparator />
							<Link href={"/updateprofile"}>
								<DropdownMenuItem className='cursor-pointer'>
									<FaEdit className='w-4 h-4 mr-2' />
									Edit Profile
								</DropdownMenuItem>
							</Link>
							<DropdownMenuSeparator />
							<Link href={"/forgotpassword"}>
								<DropdownMenuItem className='cursor-pointer'>
									<MdOutlineLockReset className='w-4 h-4 mr-2' />
									Forgot Password
								</DropdownMenuItem>
							</Link>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								onClick={deleteProfile}
								className='cursor-pointer'>
								<FaRegTrashAlt className='w-4 h-4 mr-2' />
								Delete Profile
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<Link href={"/support"}>
								<DropdownMenuItem className='cursor-pointer'>
									<BiSupport className='h-4 w-4 mr-2' />
									Support
								</DropdownMenuItem>
							</Link>
							<DropdownMenuSeparator />
							<Link href={"/about"}>
								<DropdownMenuItem className='cursor-pointer'>
									<FcAbout className='h-4 w-4 mr-2' />
									About
								</DropdownMenuItem>
							</Link>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								onClick={logOut}
								className='cursor-pointer'>
								<MdLogout className='w-4 h-4 mr-2' />
								Logout
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</div>
	);
};

export default Header;
