import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";

const Header = () => {
	return (
		<div className='flex fixed top-0 bg-white items-center justify-center z-10 w-full h-[80px] border-y-[1px] border-gray-400 '>
			<div className='flex justify-between items-center w-[900px] p-4'>
				<div>
					<Avatar>
						<AvatarImage src='https://github.com/shadcn.png' />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
				</div>
				<div>
					<h3 className='text-lg font-bold'>Friendify</h3>
				</div>
				<div>
					<Link href={"#"}>Logout</Link>
				</div>
			</div>
		</div>
	);
};

export default Header;
