"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Signup = () => {
	const [user, setUser] = useState({
		name: "",
		username: "",
		email: "",
		password: "",
	});
	const [loading, setLoading] = useState(false);
	const [username, setUsername] = useState("");
	const [isUsernameAvailable, setIsUsernameAvailable]: any = useState();

	const router = useRouter();

	const checkUsernameAvailability = async (username: string) => {
		try {
			const res = await axios.post("/api/users/unique-username", {
				username,
			});
			setIsUsernameAvailable(res.data);
		} catch (error: any) {
			setIsUsernameAvailable(error.response.data);
			throw Error(error);
		}
	};

	const onRegister = async () => {
		try {
			setLoading(true);
			const res = await axios.post("/api/users/signup", user);
			toast.success(res.data.message);
			setLoading(false);
			setTimeout(() => {
				const confirmed = window.confirm(
					"Please verify your email address to login, verification link has been sended to your email address!"
				);
				if (!confirmed) return;
			}, 1000);
			router.push("/login");
		} catch (error: any) {
			setLoading(false);
			toast.error(error.response.data.message);
			throw new Error(error);
		}
	};

	return (
		<div className='flex flex-col mt-[-40px] md:mt-[10%] relative items-center justify-center md:pt-5 m-auto lg:w-[900px] md:w-[900px]'>
			<div className='flex lg:w-1/2 md:w-1/2 items-center justify-center dark:bg-gray-950'>
				<div className='w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800'>
					<div className='space-y-2 text-center'>
						<h1 className='text-3xl font-bold'>Sign Up</h1>
						<p className='text-gray-500 dark:text-gray-400'>
							{loading
								? "Processing"
								: "Create your account to get started."}
						</p>
					</div>
					<form className='space-y-4'>
						<div className='space-y-2'>
							<Label htmlFor='name'>Name</Label>
							<Input
								id='name'
								type='text'
								placeholder='Enter full name'
								required
								value={user.name}
								onChange={(e) =>
									setUser({
										...user,
										name: e.target.value,
									})
								}
							/>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='username'>Username</Label>
							<Input
								id='username'
								type='text'
								placeholder='Enter username'
								required
								value={user.username}
								onChange={(e) => {
									setUser({
										...user,
										username: e.target.value,
									});
									setUsername(e.target.value);
									checkUsernameAvailability(e.target.value);
								}}
							/>
							{username !== "" && (
								<div>
									<p
										className={
											isUsernameAvailable?.isUnique
												? "text-green-500"
												: "text-red-500"
										}>
										{isUsernameAvailable?.message}
									</p>
								</div>
							)}
						</div>
						<div className='space-y-2'>
							<Label htmlFor='email'>Email</Label>
							<Input
								id='email'
								type='email'
								placeholder='example@gmail.com'
								required
								value={user.email}
								onChange={(e) =>
									setUser({
										...user,
										email: e.target.value,
									})
								}
							/>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='password'>Password</Label>
							<Input
								id='password'
								type='password'
								placeholder='Enter password'
								required
								value={user.password}
								onChange={(e) =>
									setUser({
										...user,
										password: e.target.value,
									})
								}
							/>
						</div>
						<Button
							type='button'
							onClick={onRegister}
							className='w-full bg-blue-500 hover:bg-blue-600 text-white'>
							{loading ? "Processing" : "Sign Up"}
						</Button>
					</form>
					<div>
						<span>Already have an account:</span>{" "}
						<Link
							href={"/login"}
							className='text-blue-500 font-semibold'>
							Sign In
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Signup;
