'use client'

import Image from 'next/image'
import { forwardRef } from 'react'

import { IBall } from '@/types/components.types'

const Ball = forwardRef<HTMLDivElement, IBall>(
	({ number, src, isPast }, ref) => {
		return (
			<div
				className={`relative ${isPast ? 'hover:filter hover:brightness-75' : 'cursor-not-allowed'}`}
				ref={ref}
			>
				<Image
					src={src}
					alt='Ball'
					width={40}
					height={40}
					className='zed-lg:w-20 zed-lg:h-20'
				/>
				<p className='absolute text-xs top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary font-semibold zed-lg:text-xl'>
					{number}
				</p>
			</div>
		)
	}
)

Ball.displayName = 'Ball'

export { Ball }
