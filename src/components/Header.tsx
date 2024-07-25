'use client'

import Link from 'next/link'

import { useAuth } from '@/hooks/useAuth'

import { HeaderButtons } from './HeaderButtons'

export const Header = () => {
	const { data } = useAuth()

	console.log("Header:", data?.data.email)

	return (
		<>
			<header className='flex justify-between items-center p-3 relative zed-lg:p-10'>
				<div className='zed-lg:relative'>
					<img src='./logo.svg' alt='Logo' className='w-[80px] zed-lg:w-full' />
					<p className='text-xs zed-lg:absolute zed-lg:-top-1 zed-lg:-right-16 zed-lg:rotate-[35deg]'>
						for the hakaton
					</p>
				</div>
				<div className='flex items-center'>
					<p className='hidden text-sm font-semibold zed-xl:block'>
						При поддержке:{' '}
					</p>
					<Link
						href='https://cyberprotect.ru'
						target='_blank'
						rel='noopener noreferrer'
					>
						<img
							src='./white-sponsor.png'
							alt='Sponsor'
							className='w-[150px] zed-lg:w-[300px]'
						/>
					</Link>
				</div>
				<HeaderButtons data={data} />
			</header>
			<div className='flex items-center justify-center'>
				<img
					src='./header.png'
					alt='Header'
					className='absolute top-18 zed-lg:top-[100px] '
				/>
			</div>
		</>
	)
}
