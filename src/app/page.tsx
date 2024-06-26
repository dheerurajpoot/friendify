"use client";
import CreatePost from "@/components/CreatePost";
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
	return (
		<main className='w-full'>
			<CreatePost />
		</main>
	);
}
