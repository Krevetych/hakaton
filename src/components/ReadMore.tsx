'use client'

import { X } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

interface ReadMoreProps {
	text: string
	title: string
	link: string
}

const ReadMore: React.FC<ReadMoreProps> = ({
	text,
	title,
	link
}: ReadMoreProps) => {
	const [isModalOpen, setIsModalOpen] = useState(false)

	const handleOpenModal = () => setIsModalOpen(true)
	const handleCloseModal = () => setIsModalOpen(false)

	const shortenedText = text.length > 100 ? `${text.slice(0, 100)}...` : text

	return (
		<div className='relative'>
			<p className=''>
				{shortenedText}
				{text.length > 100 && (
					<button
						onClick={handleOpenModal}
						className='ml-2 text-tertiary underline font-semibold'
					>
						Подробнее
					</button>
				)}
			</p>

			{isModalOpen && (
				<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-3'>
					<div className='bg-primary p-6 rounded-lg shadow-lg max-w-lg w-full'>
						<div className='flex items-center justify-between  mb-4'>
							<h2 className='text-xl font-semibold'>{title}</h2>
							<X onClick={handleCloseModal} />
						</div>
						<p>{text}</p>
						<p className='pt-2'>
							Сайт:{' '}
							<Link href={link} className='text-tertiary font-semibold'>
								{link}
							</Link>{' '}
						</p>
					</div>
				</div>
			)}
		</div>
	)
}

export default ReadMore
