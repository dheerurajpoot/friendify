"use client";
import CreatePost from "@/components/CreatePost";
import Post from "@/components/Post";
import axios from "axios";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import toast from "react-hot-toast";

export interface PostType {
	_id: string;
	postContent: string;
	image: string;
	createdBy: { _id: string };
	createdAt: string;
	likes: [];
	comments: [];
}
export default function Home() {
	const [loading, setLoading] = useState(false);
	const [posts, setPosts] = useState<PostType[]>([]);

	const getAllPosts = async () => {
		try {
			setLoading(true);
			const response = await axios.get("/api/posts/getallposts");
			if (!response.data.success) {
				toast("Something Went Wront! Please Try Again Letter");
			}
			setPosts(response.data.posts);
			setLoading(false);
		} catch (error: any) {
			throw new Error(error);
		}
	};
	useEffect(() => {
		getAllPosts();
	}, []);

	const allPosts = posts
		.slice()
		.sort(
			(a, b) =>
				new Date(b.createdAt).getTime() -
				new Date(a.createdAt).getTime()
		);

	return (
		<main className='w-full'>
			<CreatePost />
			{loading && loading ? (
				<div className='flex flex-col p-4 space-y-3 bg-white my-4 dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm m-auto lg:w-[900px] md:w-[900px]'>
					<div className='space-y-2'>
						<Skeleton className='h-4 w-full' />
						<Skeleton className='h-4 w-full' />
					</div>
					<Skeleton className='h-[450px] w-full rounded-xl' />
				</div>
			) : (
				<div>
					{allPosts &&
						allPosts.map((post) => (
							<Post key={post._id} data={post} />
						))}
				</div>
			)}
		</main>
	);
}
