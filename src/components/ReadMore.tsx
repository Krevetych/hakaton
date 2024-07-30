import Link from 'next/link'
import React from 'react'

import { TReadMore } from '@/types/sponsor.types'

import {
	Modal,
	ModalBody,
	ModalContent,
	ModalTrigger
} from './ui/AnimatedModal'

const ReadMore: React.FC<TReadMore> = ({ text, title, link }: TReadMore) => {
	const shortenedText = text.length > 100 ? `${text.slice(0, 100)}...` : text

	return (
		<div className='relative'>
			<Modal>
				{shortenedText}
				<ModalTrigger>
					{text.length > 100 && (
						<div className='text-tertiary underline font-semibold'>
							Подробнее
						</div>
					)}
				</ModalTrigger>
				<ModalBody>
					<ModalContent className='gap-y-2'>
						<p className='text-xl font-semibold'>{title}</p>
						<div>{text}</div>
						<Link
							href={link}
							target='_blank'
							rel='noopener noreferrer'
							className='font-semibold'
						>
							Ссылка: <span className='text-tertiary'>{link}</span>
						</Link>
					</ModalContent>
				</ModalBody>
			</Modal>
		</div>
	)
}

export default ReadMore
