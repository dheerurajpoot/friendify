"use client";
import CreatePost from "@/components/CreatePost";
import Post from "@/components/Post";
import axios from "axios";
import { useEffect, useState } from "react";

interface PostType {
	_id: string;
	postContent: string;
	image: string;
	createdBy: string;
	createdAt: string;
}
export default function Home() {
	const [loading, setLoading] = useState(false);
	const [posts, setPosts] = useState<PostType[]>([]);

	const getAllPosts = async () => {
		try {
			setLoading(true);
			const response = await axios.get("/api/posts/getallposts");
			setPosts(response.data.posts);
			setLoading(false);
		} catch (error: any) {
			throw new Error(error);
		}
	};
	useEffect(() => {
		getAllPosts();
	}, []);

	return (
		<main className='w-full'>
			<CreatePost />
			{posts && posts.map((post) => <Post key={post._id} data={post} />)}
		</main>
	);
}
