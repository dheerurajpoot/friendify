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
	const router = useRouter();

	const onRegister = async () => {
		try {
			setLoading(true);
			const response = await axios.post("/api/users/signup", user);
			console.log(response.data);

			toast.success("Registration successfull");
			router.push("/login");
		} catch (error: any) {
			console.log("Registration Failed");
			toast.error(error.message);
		}
	};

	return (
		<div className='flex flex-col mt-[10%] relative items-center justify-center pt-5 m-auto lg:w-[900px] md:w-[900px]'>
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
								onChange={(e) =>
									setUser({
										...user,
										username: e.target.value,
									})
								}
							/>
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
