'use client'

import { X } from 'lucide-react'
import { useState } from 'react'

interface IImage {
	src: string
	alt: string
	link?: string
}

const ImagePreview = ({ src, alt, link }: IImage) => {
	const [isPreviewOpen, setIsPreviewOpen] = useState(false)

	const handleImageClick = () => {
		setIsPreviewOpen(true)
	}

	const handleCloseClick = () => {
		setIsPreviewOpen(false)
	}

	return (
		<div className='relative'>
			<img
				src={src}
				alt={alt}
				className='cursor-pointer rounded-lg'
				onClick={handleImageClick}
			/>
			{link && (
				<p className='absolute bottom-2 left-2 bg-black/30 px-3 py-1 rounded-xl transition-colors duration-500 cursor-pointer hover:bg-black/80'>
					Ссылка: {link}
				</p>
			)}
			{isPreviewOpen && (
				<div className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50'>
					<div className='relative'>
						<button
							className='absolute top-2 right-2 text-white bg-black/50 rounded-full p-[0.5px]'
							onClick={handleCloseClick}
						>
							<X />
						</button>
						<img
							src={src}
							alt={alt}
							className='max-h-screen max-w-full rounded-lg'
						/>
					</div>
				</div>
			)}
		</div>
	)
}

export default ImagePreview
