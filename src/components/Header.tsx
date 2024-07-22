'use client'

import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { MENU } from '@/constants/menu.constants'

import { Button } from './ui/Button'

export const Header = () => {
	const [open, setOpen] = useState(false)

	return (
		<>
			<header className='flex justify-between items-center p-3 relative lg:p-10'>
				<div className='lg:relative'>
					<img src='./logo.svg' alt='Logo' className='w-[80px] lg:w-full' />
					<p className='text-xs lg:absolute lg:-top-1 lg:-right-16 lg:rotate-[35deg]'>
						for the hakaton
					</p>
				</div>
				<div className='flex items-center'>
					<p className='hidden text-sm font-semibold xl:block'>
						При поддержке:{' '}
					</p>
					<Link href='https://cyberprotect.ru'>
						<img
							src='./white-sponsor.png'
							alt='Sponsor'
							className='w-[150px] lg:w-[300px]'
						/>
					</Link>
				</div>
				<div className='visible lg:hidden'>
					<div>
						{open ? (
							<X onClick={() => setOpen(false)} />
						) : (
							<Menu onClick={() => setOpen(true)} />
						)}
					</div>
					{open && (
						<div
							className={`absolute top-16 right-2 z-10 bg-bg shadow-md  shadow-primary p-4 rounded-lg transition-opacity duration-500 ${
								open ? 'opacity-100' : 'opacity-0'
							}`}
						>
							<ul className='flex flex-col gap-y-3'>
								{MENU.map(item => (
									<li key={item.title}>
										<Button
											title={item.title}
											className='w-full text-sm py-1 px-2 active:bg-tertiary'
										/>
									</li>
								))}
							</ul>
						</div>
					)}
				</div>
				<div className='hidden lg:flex lg:gap-x-3'>
					{MENU.map(item => (
						<Button
							key={item.title}
							title={item.title}
							className='py-2 px-4 hover:bg-tertiary'
						/>
					))}
				</div>
			</header>
			<div className='flex items-center justify-center'>
				<img
					src='./header.png'
					alt='Header'
					className='absolute top-18 lg:top-[100px] '
				/>
			</div>
		</>
	)
}
