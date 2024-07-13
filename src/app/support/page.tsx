import { Button } from "@/components/ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import React from "react";
import { FaChevronRight } from "react-icons/fa";

const Support = () => {
	return (
		<div className='flex flex-col m-auto lg:w-[900px] md:w-[900px]'>
			<section className='w-full py-10 md:py-16 lg:py-24 bg-muted'>
				<div className='container px-4 md:px-6 text-center'>
					<div className='space-y-4'>
						<h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
							Get in Touch
						</h1>
						<p className='max-w-[700px] mx-auto text-muted-foreground md:text-xl'>
							We're here to help! Whether you have a question,
							feedback, or need support, our team is ready to
							assist you.
						</p>
					</div>
				</div>
			</section>
			<div className='flex flex-col min-h-dvh'>
				<main className='flex-1'>
					<section className='py-12 md:py-16 lg:py-20'>
						<div className='container'>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
								<div>
									<h2 className='text-3xl font-bold mb-4'>
										Contact Us
									</h2>
									<form
										action='https://formspree.io/f/movavezb'
										method='POST'
										className='space-y-4'>
										<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
											<div>
												<Label htmlFor='name'>
													Name
												</Label>
												<Input
													id='name'
													name='name'
													type='text'
													placeholder='Enter your name'
												/>
											</div>
											<div>
												<Label htmlFor='email'>
													Email
												</Label>
												<Input
													id='email'
													type='email'
													name='email'
													placeholder='Enter your email'
												/>
											</div>
										</div>
										<div>
											<Label htmlFor='subject'>
												Subject
											</Label>
											<Input
												id='subject'
												type='text'
												name='subject'
												placeholder='Enter the subject'
											/>
										</div>
										<div>
											<Label htmlFor='message'>
												Message
											</Label>
											<Textarea
												id='message'
												name='message'
												placeholder='Enter your message'
												rows={4}
											/>
										</div>
										<Button type='submit'>Submit</Button>
									</form>
								</div>
								<div className='space-y-4'>
									<div>
										<h3 className='text-xl font-bold mb-2'>
											Office
										</h3>
										<p>
											Old Shivli Road, Kalyanpur, Kanpur
											Nagar (208017)
										</p>
									</div>
									<div>
										<h3 className='text-xl font-bold mb-2'>
											Phone
										</h3>
										<p>+91 9026315148</p>
									</div>
									<div>
										<h3 className='text-xl font-bold mb-2'>
											Email
										</h3>
										<p>support@hiketok.com</p>
									</div>
								</div>
							</div>
						</div>
					</section>
					<section className='py-12 md:py-16 lg:py-20 bg-muted'>
						<div className='container'>
							<h2 className='text-3xl font-bold mb-8'>Support</h2>
							<div className='space-y-4'>
								<Collapsible>
									<CollapsibleTrigger className='flex items-center justify-between w-full bg-background rounded-md px-4 py-3 text-lg font-medium [&[data-state=open]>svg]:rotate-90'>
										How do I create a new account?
										<FaChevronRight className='h-5 w-5 transition-transform' />
									</CollapsibleTrigger>
									<CollapsibleContent className='px-4 py-3 text-muted-foreground'>
										To create a new account, simply click
										the "Sign Up" button in the top right
										corner of the website and follow the
										on-screen instructions.
									</CollapsibleContent>
								</Collapsible>
								<Collapsible>
									<CollapsibleTrigger className='flex items-center justify-between w-full bg-background rounded-md px-4 py-3 text-lg font-medium [&[data-state=open]>svg]:rotate-90'>
										How do I reset my password?
										<FaChevronRight className='h-5 w-5 transition-transform' />
									</CollapsibleTrigger>
									<CollapsibleContent className='px-4 py-3 text-muted-foreground'>
										To reset your password, click the
										"Forgot Password" link on the login page
										and follow the instructions to reset
										your password.
									</CollapsibleContent>
								</Collapsible>
								<Collapsible>
									<CollapsibleTrigger className='flex items-center justify-between w-full bg-background rounded-md px-4 py-3 text-lg font-medium [&[data-state=open]>svg]:rotate-90'>
										How do I delete my account?
										<FaChevronRight className='h-5 w-5 transition-transform' />
									</CollapsibleTrigger>
									<CollapsibleContent className='px-4 py-3 text-muted-foreground'>
										To delete your account, please contact
										our support team at
										support@socialmedia.com and they will
										assist you with the process.
									</CollapsibleContent>
								</Collapsible>
							</div>
						</div>
					</section>
				</main>
				<footer className='p-6 md:p-8 text-sm'>
					<div className='container flex flex-col-reverse md:flex-row items-center justify-between'>
						<p>&copy; 2024 HikeTok. All rights reserved.</p>
						<div className='flex space-x-4 mt-4 md:mt-0'>
							<Link
								href='#'
								className='hover:underline'
								prefetch={false}>
								Privacy Policy
							</Link>
							<Link
								href='#'
								className='hover:underline'
								prefetch={false}>
								Terms of Service
							</Link>
							<Link
								href='#'
								className='hover:underline'
								prefetch={false}>
								Cookie Policy
							</Link>
						</div>
					</div>
				</footer>
			</div>
		</div>
	);
};

export default Support;
