import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React from "react";

const Signup = () => {
	return (
		<div className='flex flex-col min-h-sm relative items-center justify-center pt-5 m-auto lg:w-[900px] md:w-[900px]'>
			<div className='flex min-h-screen items-center justify-center dark:bg-gray-950'>
				<div className='w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800'>
					<div className='space-y-2 text-center'>
						<h1 className='text-3xl font-bold'>Sign Up</h1>
						<p className='text-gray-500 dark:text-gray-400'>
							Create your account to get started.
						</p>
					</div>
					<form className='space-y-4'>
						<div className='grid grid-cols-2 gap-4'>
							<div className='space-y-2'>
								<Label htmlFor='firstName'>First Name</Label>
								<Input
									id='firstName'
									placeholder='John'
									required
								/>
							</div>
							<div className='space-y-2'>
								<Label htmlFor='lastName'>Last Name</Label>
								<Input
									id='lastName'
									placeholder='Doe'
									required
								/>
							</div>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='username'>Username</Label>
							<Input
								id='username'
								type='text'
								placeholder='Enter username'
								required
							/>
						</div>
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
							<Label htmlFor='phone'>Phone Number</Label>
							<Input
								id='phone'
								type='tel'
								placeholder='+1 (555) 555-5555'
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
							Sign Up
						</Button>
					</form>
					<div>
						<span>Already have an account:</span>{" "}
						<Link
							href={"/signin"}
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
