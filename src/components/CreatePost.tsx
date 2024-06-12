"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { BsEmojiSmile } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { FaRegImage } from "react-icons/fa6";

export default function Component() {
	const [postContent, setPostContent] = useState("");
	const [selectedImage, setSelectedImage] = useState(null);
	const [isEmojiModalOpen, setIsEmojiModalOpen] = useState(false);
	const [emojis, setEmojis] = useState([
		"😀",
		"😃",
		"😄",
		"😁",
		"😆",
		"😅",
		"😂",
		"🤣",
		"🥲",
		"☺️",
		"😊",
		"😇",
		"🙂",
		"🙃",
		"😉",
		"😌",
		"😍",
		"🥰",
		"😘",
		"😗",
		"😙",
		"😚",
		"😋",
		"😛",
		"😝",
		"😜",
		"🤪",
		"🤨",
		"🧐",
		"🤓",
	]);
	const handlePostContentChange = (e: any) => {
		setPostContent(e.target.value);
	};
	const handleImageUpload = () => {
		const fileInput = document.createElement("input");
		fileInput.type = "file";
		fileInput.accept = "image/*";
		fileInput.onchange = (e: any) => {
			setSelectedImage(e.target.files[0]);
		};
		fileInput.click();
	};
	const handleEmojiSelect = (emoji: any) => {
		setPostContent(postContent + emoji);
		setIsEmojiModalOpen(false);
	};

	return (
		<div className='bg-white dark:bg-gray-950 rounded-lg shadow-md p-4 sm:p-6 flex flex-col min-h-sm relative items-center justify-center pt-5 m-auto lg:w-[900px] md:w-[900px]'>
			<div className='flex flex-col gap-4 w-full'>
				<Textarea
					value={postContent}
					onChange={handlePostContentChange}
					placeholder="What's on your mind?"
					className='w-full resize-none border-gray-200 dark:border-gray-800 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-gray-950 dark:focus:ring-gray-300'
					rows={4}
				/>
				<div className='flex items-center justify-between'>
					<div className='flex items-center'>
						<div className='flex items-center gap-2'>
							<Button
								onClick={handleImageUpload}
								variant='ghost'
								size='icon'
								className='text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'>
								<FaRegImage className='w-5 h-5' />
								<span className='sr-only'>Upload image</span>
							</Button>
							{selectedImage && (
								<div className='flex items-center gap-2'>
									<img
										src={selectedImage}
										alt='Post image'
										width={40}
										height={40}
										className='rounded-lg'
									/>
									<Button
										variant='ghost'
										size='icon'
										className='text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'>
										<RxCross2 className='w-4 h-4' />
										<span className='sr-only'>
											Remove image
										</span>
									</Button>
								</div>
							)}
						</div>
						<Button
							onClick={() => setIsEmojiModalOpen(true)}
							variant='ghost'
							size='icon'
							className='text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'>
							<BsEmojiSmile className='w-5 h-5' />
							<span className='sr-only'>Add emoji</span>
						</Button>
					</div>
					<Button>+Post</Button>
				</div>
			</div>
			<Dialog open={isEmojiModalOpen} onOpenChange={setIsEmojiModalOpen}>
				<DialogContent className='bg-white dark:bg-gray-950 rounded-lg shadow-md p-4 sm:p-6 max-w-md'>
					<div className='flex flex-wrap gap-2 justify-center'>
						{emojis.map((emoji, index) => (
							<Button
								key={index}
								onClick={() => handleEmojiSelect(emoji)}
								variant='ghost'
								size='icon'
								className='text-2xl hover:bg-gray-100 dark:hover:bg-gray-800'>
								{emoji}
							</Button>
						))}
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}
