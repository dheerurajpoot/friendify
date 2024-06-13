import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React from "react";

const Signin = () => {
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
							/>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='password'>Password</Label>
							<Input
								id='password'
								type='password'
								placeholder='Enter password'
								required
							/>
						</div>
						<Button
							type='submit'
							className='w-full bg-blue-500 hover:bg-blue-600 text-white'>
							Sign In
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
