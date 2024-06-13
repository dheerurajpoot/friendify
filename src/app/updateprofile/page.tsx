"use client";

import { useState } from "react";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ProfilePic from "./../../../public/post.jpg";
import Image from "next/image";
import { IoMdArrowRoundBack } from "react-icons/io";
import Link from "next/link";

export default function Component() {
	const [name, setName] = useState("Jared Palmer");
	const [username, setUsername] = useState("jaredpalmer");
	const [email, setEmail] = useState("jared@example.com");
	const [password, setPassword] = useState("");
	const [about, setAbout] = useState(
		"I am a software engineer and designer."
	);
	const [profilePhoto, setProfilePhoto] = useState("/placeholder-user.jpg");
	const [showConfirmation, setShowConfirmation] = useState(false);
	const handleProfilePhotoUpload = (event: any) => {
		const file = event.target.files[0];
		setProfilePhoto(URL.createObjectURL(file));
	};
	const handleSubmit = (event: any) => {
		event.preventDefault();
		setShowConfirmation(true);
	};
	return (
		<div className='flex flex-col min-h-sm relative items-center justify-center pt-5 m-auto lg:w-[900px] md:w-[900px]'>
			<form className='w-full'>
				<Card className='w-full mx-auto'>
					<div className='flex items-center ml-4'>
						<Link href={"/profile"}>
							<Button
								variant='ghost'
								size='icon'
								className='rounded-full'>
								<IoMdArrowRoundBack className='w-5 h-5 text-gray-500 dark:text-gray-400' />
							</Button>
						</Link>
						<CardHeader>
							<CardTitle>Update Profile</CardTitle>
							<CardDescription>
								Make changes to your profile information below.
							</CardDescription>
						</CardHeader>
					</div>
					<CardContent className='space-y-4'>
						<div className='flex flex-col items-center'>
							<Image
								className='w-40 h-40 mb-3 rounded-full shadow-lg'
								width={120}
								height={120}
								src={ProfilePic}
								alt='Profile Picture'
							/>
							<input
								type='file'
								accept='image/*'
								className='hidden'
								id='profile-photo'
								onChange={handleProfilePhotoUpload}
							/>
							<label
								htmlFor='profile-photo'
								className='text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 cursor-pointer'>
								Change Profile Photo
							</label>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='name'>Name</Label>
							<Input
								id='name'
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
							/>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='username'>Username</Label>
							<Input
								id='username'
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								required
							/>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='email'>Email</Label>
							<Input
								id='email'
								type='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='password'>Password</Label>
							<Input
								id='password'
								type='password'
								placeholder='New password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='about'>About</Label>
							<Textarea
								id='about'
								value={about}
								onChange={(e) => setAbout(e.target.value)}
								rows={3}
								required
							/>
						</div>
					</CardContent>
					<CardFooter className='flex justify-center'>
						<Button onClick={handleSubmit}>Update Profile</Button>
					</CardFooter>
					{showConfirmation && <div />}
				</Card>
			</form>
		</div>
	);
}
