import CreatePost from "@/components/CreatePost";
import Post from "@/components/Post";

export default function Home() {
	return (
		<main className='w-full'>
			<CreatePost />
			<Post />
			<Post />
		</main>
	);
}
