import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import React from "react";
import {
	FaInfoCircle,
	FaRegCompass,
	FaShareAlt,
	FaUsers,
} from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { LuMails } from "react-icons/lu";
import dheeruImg from "./../../../public/dheerurajpoot.png";
import networkImg from "./../../../public/network.jpg";
import Image from "next/image";

const About = () => {
	return (
		<div className='flex flex-col m-auto lg:w-[900px] md:w-[900px]'>
			<div className='flex flex-col min-h-dvh'>
				<section className='w-full pt-12 md:pt-24 lg:pt-32 border-b'>
					<div className='container space-y-10 xl:space-y-16'>
						<div className='grid gap-4 px-10 md:grid-cols-2 md:gap-16'>
							<div>
								<h1 className='lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]'>
									Connecting the World, One Post at a Time
								</h1>
								<p className='mx-auto max-w-[700px] text-muted-foreground md:text-xl'>
									Our mission is to bring people together
									through meaningful social interactions and
									shared experiences. We believe in the power
									of community and the transformative
									potential of technology.
								</p>
							</div>
							<Image
								src={networkImg}
								width='510'
								height='620'
								alt='Hero'
								className='mx-auto overflow-hidden rounded-xl object-cover'
							/>
						</div>
					</div>
				</section>
				<section className='w-full py-12 md:py-24 lg:py-32'>
					<div className='container space-y-12 px-4 md:px-6'>
						<div className='flex flex-col items-center justify-center space-y-4 text-center'>
							<div className='space-y-2'>
								<h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
									Meet the Founder
								</h2>
								<p className='max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
									Our team of passionate individuals is
									dedicated to building a platform that
									empowers people to connect, share, and grow.
								</p>
							</div>
						</div>
						<div className='mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3'>
							<div className='grid gap-4'>
								<Avatar>
									<AvatarImage src='./../../../public/dheerurajpoot.png' />
									<AvatarFallback>DR</AvatarFallback>
								</Avatar>
								<div className='grid gap-1'>
									<h3 className='text-lg font-bold'>
										Dheeru Rajpoot
									</h3>
									<p className='text-sm text-muted-foreground'>
										Founder & CEO
									</p>
									<p className='text-sm text-muted-foreground'>
										I am a seasoned entrepreneur with a
										passion for building innovative
										technology solutions.
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className='w-full py-12 md:py-24 lg:py-32 bg-muted'>
					<div className='container space-y-12 px-4 md:px-6'>
						<div className='flex flex-col items-center justify-center space-y-4 text-center'>
							<div className='space-y-2'>
								<h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
									Our Story
								</h2>
								<p className='max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
									Our journey began with a simple idea: to
									create a platform that would bring people
									together and foster meaningful connections.
									Over the years, we've grown into a thriving
									community of users who share our passion for
									social interaction and personal growth.
								</p>
							</div>
						</div>
						<div className='mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12'>
							<Image
								src={dheeruImg}
								width='550'
								height='600'
								alt='Our Story'
								className='mx-auto overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last'
							/>
							<div className='flex flex-col justify-center space-y-4'>
								<div className='grid gap-1'>
									<h3 className='text-xl font-bold'>
										Humble Beginnings
									</h3>
									<p className='text-muted-foreground'>
										Our platform started as a simple idea in
										a small garage, where our founders
										worked tirelessly to bring their vision
										to life.
									</p>
								</div>
								<div className='grid gap-1'>
									<h3 className='text-xl font-bold'>
										Rapid Growth
									</h3>
									<p className='text-muted-foreground'>
										As word spread, our user base grew
										exponentially, and we quickly became a
										leading player in the social media
										landscape.
									</p>
								</div>
								<div className='grid gap-1'>
									<h3 className='text-xl font-bold'>
										Continuous Innovation
									</h3>
									<p className='text-muted-foreground'>
										We're constantly evolving and improving
										our platform to better serve our users
										and stay ahead of the curve in the
										ever-changing world of social media.
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className='w-full py-12 md:py-24 lg:py-32'>
					<div className='container space-y-12 px-4 md:px-6'>
						<div className='flex flex-col items-center justify-center space-y-4 text-center'>
							<div className='space-y-2'>
								<h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
									Key Features
								</h2>
								<p className='max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
									Our platform offers a wide range of features
									to help you connect, share, and grow with
									your community.
								</p>
							</div>
						</div>
						<div className='mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3'>
							<div className='grid gap-4'>
								<div className='bg-primary rounded-md p-3 flex items-center justify-center'>
									<FaUsers className='w-6 h-6 text-primary-foreground' />
								</div>
								<div className='grid gap-1'>
									<h3 className='text-lg font-bold'>
										Robust Networking
									</h3>
									<p className='text-muted-foreground'>
										Connect with like-minded individuals,
										join communities, and build lasting
										relationships.
									</p>
								</div>
							</div>
							<div className='grid gap-4'>
								<div className='bg-primary rounded-md p-3 flex items-center justify-center'>
									<FaShareAlt className='w-6 h-6 text-primary-foreground' />
								</div>
								<div className='grid gap-1'>
									<h3 className='text-lg font-bold'>
										Seamless Sharing
									</h3>
									<p className='text-muted-foreground'>
										Easily share your thoughts, photos, and
										experiences with your network.
									</p>
								</div>
							</div>
							<div className='grid gap-4'>
								<div className='bg-primary rounded-md p-3 flex items-center justify-center'>
									<FaRegCompass className='w-6 h-6 text-primary-foreground' />
								</div>
								<div className='grid gap-1'>
									<h3 className='text-lg font-bold'>
										Personalized Discovery
									</h3>
									<p className='text-muted-foreground'>
										Discover new content, communities, and
										opportunities tailored to your
										interests.
									</p>
								</div>
							</div>
							<div className='grid gap-4'>
								<div className='bg-primary rounded-md p-3 flex items-center justify-center'>
									<LuMails className='w-6 h-6 text-primary-foreground' />
								</div>
								<div className='grid gap-1'>
									<h3 className='text-lg font-bold'>
										Intelligent Notifications
									</h3>
									<p className='text-muted-foreground'>
										Stay up-to-date with the latest updates
										from your network and communities.
									</p>
								</div>
							</div>
							<div className='grid gap-4'>
								<div className='bg-primary rounded-md p-3 flex items-center justify-center'>
									<FaInfoCircle className='w-6 h-6 text-primary-foreground' />
								</div>
								<div className='grid gap-1'>
									<h3 className='text-lg font-bold'>
										Insightful Analytics
									</h3>
									<p className='text-muted-foreground'>
										Track your growth, engagement, and
										performance on the platform.
									</p>
								</div>
							</div>
							<div className='grid gap-4'>
								<div className='bg-primary rounded-md p-3 flex items-center justify-center'>
									<IoSettingsSharp className='w-6 h-6 text-primary-foreground' />
								</div>
								<div className='grid gap-1'>
									<h3 className='text-lg font-bold'>
										Customizable Settings
									</h3>
									<p className='text-muted-foreground'>
										Personalize your experience with a wide
										range of customization options.
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className='w-full py-12 md:py-24 lg:py-32 border-t'>
					<div className='container px-4 md:px-6'>
						<div className='grid gap-10 px-10 md:gap-16 lg:grid-cols-2'>
							<div className='space-y-4'>
								<div className='inline-block rounded-lg bg-muted px-3 py-1 text-sm'>
									Join the Community
								</div>
								<h2 className='lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]'>
									Experience the Power of Connection
								</h2>
							</div>
							<div className='flex flex-col items-start space-y-4'>
								<div className='inline-block rounded-lg bg-muted px-3 py-1 text-sm'>
									Why Join?
								</div>
								<p className='mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed'>
									Our platform offers a unique opportunity to
									connect with like-minded individuals, share
									your passions, and grow together. Join our
									vibrant community and unlock a world of new
									possibilities.
								</p>
								<Link
									href='#'
									className='inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'
									prefetch={false}>
									Learn More
								</Link>
							</div>
						</div>
					</div>
				</section>
				<footer className='flex flex-col-reverse gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t'>
					<p className='text-xs text-muted-foreground'>
						&copy; 2024 HikeTok. All rights reserved.
					</p>
					<nav className='sm:ml-auto flex gap-4 sm:gap-6'>
						<Link
							href='/terms-of-service'
							className='text-xs hover:underline underline-offset-4'
							prefetch={false}>
							Terms of Service
						</Link>
						<Link
							href='/privacy-policy'
							className='text-xs hover:underline underline-offset-4'
							prefetch={false}>
							Privacy Policy
						</Link>
						<Link
							href='/support'
							className='text-xs hover:underline underline-offset-4'
							prefetch={false}>
							Contact Us
						</Link>
					</nav>
				</footer>
			</div>
		</div>
	);
};

export default About;
