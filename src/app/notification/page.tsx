import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

export default function Component() {
	return (
		<div className='bg-white dark:bg-gray-950 rounded-lg shadow-md p-4 m-auto lg:w-[900px] md:w-[900px]'>
			<Card className='w-full'>
				<CardHeader className='flex items-center justify-between pb-4'>
					<CardTitle>Notifications</CardTitle>
				</CardHeader>
				<CardContent className='space-y-4'>
					<div className='flex items-center space-x-4'>
						<Avatar>
							<AvatarImage src='https://github.com/shadcn.png' />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<div className='flex-1 space-y-1'>
							<p className='text-sm font-medium'>
								<Link
									href='#'
									className='hover:underline'
									prefetch={false}>
									Shadcn
								</Link>
								liked your post
							</p>
							<p className='text-sm text-gray-500 dark:text-gray-400'>
								2 hours ago
							</p>
						</div>
					</div>
					<div className='flex items-center space-x-4'>
						<Avatar>
							<AvatarImage src='https://github.com/shadcn.png' />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<div className='flex-1 space-y-1'>
							<p className='text-sm font-medium'>
								<Link
									href='#'
									className='hover:underline'
									prefetch={false}>
									Jared Palmer
								</Link>
								commented on your post
							</p>
							<p className='text-sm text-gray-500 dark:text-gray-400'>
								1 day ago
							</p>
						</div>
					</div>
					<div className='flex items-center space-x-4'>
						<Avatar>
							<AvatarImage src='https://github.com/shadcn.png' />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<div className='flex-1 space-y-1'>
							<p className='text-sm font-medium'>
								<Link
									href='#'
									className='hover:underline'
									prefetch={false}>
									Acme Inc
								</Link>
								sent you a friend request
							</p>
							<p className='text-sm text-gray-500 dark:text-gray-400'>
								3 days ago
							</p>
						</div>
						<div className='flex space-x-2'>
							<Button variant='outline' size='sm'>
								Accept
							</Button>
							<Button variant='ghost' size='sm'>
								Decline
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
