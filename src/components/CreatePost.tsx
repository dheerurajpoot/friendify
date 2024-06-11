import React from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

const CreatePost = () => {
	return (
		<div className='mt-24 w-full h-auto shadow rounded-lg p-4'>
			<div className='w-full p-4'>
				<Textarea placeholder='What is happening?!.' />
				<div className='flex items-center justify-between pt-4'>
					<Button>Photos</Button>
					<Button>+ Post</Button>
				</div>
			</div>
		</div>
	);
};

export default CreatePost;
