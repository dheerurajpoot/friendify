import CreatePost from "@/components/CreatePost";
import Post from "@/components/Post";

export default function Home() {
	return (
		<main className='flex min-h-screen flex-col relative items-center m-auto lg:w-[900px] md:w-[900px]'>
			<CreatePost />
			<Post />
			<Post />
		</main>
	);
}
