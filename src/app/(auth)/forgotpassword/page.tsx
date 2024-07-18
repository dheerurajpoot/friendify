"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const forgotPassword = async () => {
		try {
			setLoading(true);
			const response = await axios.post("/api/users/forgotpassword", {
				email,
			});
			toast.success(response.data.message);
			setLoading(false);
			router.push("/login");
		} catch (error: any) {
			setLoading(false);
			toast.error(error.response.data.message);
		}
	};
	return (
		<div className='flex flex-col mt-[15%] relative items-center justify-center pt-5 m-auto lg:w-[900px] md:w-[900px]'>
			<div className='flex lg:w-1/2 md:w-1/2 items-center justify-center dark:bg-gray-950'>
				<div className='w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800'>
					<div className='space-y-2 text-center'>
						<h1 className='text-3xl font-bold'>Forgot Password</h1>
						<p className='text-gray-500 dark:text-gray-400'>
							Enter your registered email address to <br /> get
							reset password link
						</p>
					</div>
					<form className='space-y-4'>
						<div className='space-y-2'>
							<Label htmlFor='email'>Email</Label>
							<Input
								id='email'
								type='email'
								placeholder='test@example.com'
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>

						<Button
							type='button'
							onClick={forgotPassword}
							className='w-full bg-blue-500 hover:bg-blue-600 text-white'>
							{loading ? "Processing" : "Send Reset Link"}
						</Button>
					</form>
					<div>
						<span>Remember password: </span>{" "}
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

export default ForgotPassword;
