"use client";
import { useEffect, useState } from "react";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ProfilePic from "./../../../public/post.jpg";
import Image from "next/image";
import { IoMdArrowRoundBack } from "react-icons/io";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { getUserFromLocalStorage } from "@/helpers/getUserFromLocalStorage";
import { User } from "../search/page";

export default function Component() {
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [profession, setProfession] = useState("");
	const [about, setAbout] = useState("");
	const [profilePhoto, setProfilePhoto] = useState<string | File>("");
	const [loading, setLoading] = useState(false);
	const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
	const router = useRouter();

	const uploadFile = async () => {
		const data = new FormData();
		if (typeof profilePhoto === "string") return profilePhoto;
		data.append("file", profilePhoto);
		data.append("upload_preset", "images-preset");
		try {
			// const cloudname = process.env.CLOUDINARY_NAME;
			const cloudname = "dfxxuq8qo";
			const resourceType = "image";
			const api = `https://api.cloudinary.com/v1_1/${cloudname}/${resourceType}/upload`;
			const res = await axios.post(api, data);
			const { secure_url } = res.data;
			return secure_url;
		} catch (error) {
			console.log(error);
			return "";
		}
	};

	useEffect(() => {
		const userData = getUserFromLocalStorage();
		if (userData) {
			setLoggedInUser(userData);
		}
	}, []);
	const userId = loggedInUser?._id;
	const getProfile = async () => {
		try {
			setLoading(true);
			if (!userId) return;
			const response = await axios.post("/api/users/profile", { userId });

			const userData = response.data.data;

			setProfilePhoto(userData?.profilepic || ProfilePic.src);
			setName(userData.name);
			setUsername(userData.username);
			setEmail(userData.email);
			setProfession(userData.profession);
			setAbout(userData.about);
			setLoading(false);
		} catch (error: any) {
			throw new Error(error);
		}
	};
	useEffect(() => {
		getProfile();
	}, [userId, getProfile]);

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		setLoading(true);
		const picUrl = await uploadFile();

		const data = {
			name,
			username,
			email,
			profilePhoto: picUrl,
			profession,
			about,
		};

		try {
			await axios.put("/api/users/updateprofile", data);
			toast.success("Profile updated successfully");
			setLoading(false);
			router.push("/profile");
		} catch (error: any) {
			setLoading(false);
			throw new Error(error);
		}
	};

	return (
		<div className='flex flex-col min-h-sm relative items-center justify-center pt-5 m-auto lg:w-[900px] md:w-[900px]'>
			<form className='w-full'>
				<Card className='w-full mx-auto'>
					<div className='flex items-center ml-4'>
						<Link href={`/profile/${loggedInUser?._id}`}>
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
								className='w-40 h-40 mb-3 rounded-full shadow-lg object-cover'
								width={120}
								height={120}
								src={
									typeof profilePhoto === "string"
										? profilePhoto
										: URL.createObjectURL(profilePhoto)
								}
								alt='Profile Picture'
							/>
							<input
								type='file'
								accept='image/*'
								className='hidden'
								id='profile-photo'
								onChange={(e: any) =>
									setProfilePhoto(e.target.files[0])
								}
							/>
							<label
								htmlFor='profile-photo'
								className='text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 cursor-pointer border-2 px-4 py-2 rounded-md'>
								Choose Profile Photo
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
							<Label htmlFor='profession'>Profession</Label>
							<Input
								id='profession'
								type='text'
								placeholder='Enter profession'
								value={profession}
								onChange={(e) => setProfession(e.target.value)}
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
								placeholder='Describe yourself...'
								required
							/>
						</div>
					</CardContent>
					<CardFooter className='flex justify-center'>
						<Button onClick={handleSubmit}>
							{loading ? "Processing" : "Update Profile"}
						</Button>
					</CardFooter>
				</Card>
			</form>
		</div>
	);
}
