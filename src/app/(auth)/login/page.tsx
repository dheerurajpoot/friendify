"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Signin = () => {
	const [user, setUser] = useState({
		email: "",
		password: "",
	});
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const onLogin = async () => {
		try {
			setLoading(true);
			const response = await axios.post("/api/users/login", user);
			localStorage.setItem("user", JSON.stringify(response.data.user));

			toast.success(response.data.message);
			router.push("/");
		} catch (error: any) {
			toast.error(error.message);
		}
	};
	return (
		<div className='flex flex-col mt-[15%] relative items-center justify-center pt-5 m-auto lg:w-[900px] md:w-[900px]'>
			<div className='flex items-center justify-center dark:bg-gray-950'>
				<div className='w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800'>
					<div className='space-y-2 text-center'>
						<h1 className='text-3xl font-bold'>Sign In</h1>
						<p className='text-gray-500 dark:text-gray-400'>
							Enter your email and password to login to your
							account.
						</p>
					</div>
					<form className='space-y-4'>
						<div className='space-y-2'>
							<Label htmlFor='email'>Email</Label>
							<Input
								id='email'
								type='email'
								placeholder='john@example.com'
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
							onClick={onLogin}
							className='w-full bg-blue-500 hover:bg-blue-600 text-white'>
							{loading ? "Processing" : "Log In"}
						</Button>
					</form>
					<div>
						<span>Don't' have an account: </span>{" "}
						<Link
							href={"/sign-up"}
							className='text-blue-500 font-semibold'>
							Create Account
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Signin;
