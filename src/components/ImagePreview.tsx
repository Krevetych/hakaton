'use client'

import { X } from 'lucide-react'
import { useState } from 'react'

interface IImage {
	src: string
	alt: string
}

const ImagePreview = ({ src, alt }: IImage) => {
	const [isPreviewOpen, setIsPreviewOpen] = useState(false)

	const handleImageClick = () => {
		setIsPreviewOpen(true)
	}

	const handleCloseClick = () => {
		setIsPreviewOpen(false)
	}

	return (
		<div>
			<img
				src={src}
				alt={alt}
				className='cursor-pointer rounded-lg'
				onClick={handleImageClick}
			/>
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
