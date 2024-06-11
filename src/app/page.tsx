import CreatePost from "@/components/CreatePost";
import Header from "@/components/Header";
import NavMenu from "@/components/NavMenu";
import Post from "@/components/Post";

export default function Home() {
	return (
		<main className='flex min-h-screen flex-col relative items-center m-auto w-[900px] pt-0'>
			<Header />
			<CreatePost />
			<Post />
			<Post />
			<div className='mb-20'></div>
			<NavMenu />
		</main>
	);
}
