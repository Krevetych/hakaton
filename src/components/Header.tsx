'use client'

import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { MENU } from '@/constants/menu.constants'

import { LoginForm } from './auth/LoginForm'
import { RegisterForm } from './auth/RegisterForm'
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalTrigger
} from './ui/AnimatedModal'
import { Button } from './ui/Button'

export const Header = () => {
	const [open, setOpen] = useState(false)

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
					<Link href='https://cyberprotect.ru'>
						<img
							src='./white-sponsor.png'
							alt='Sponsor'
							className='w-[150px] zed-lg:w-[300px]'
						/>
					</Link>
				</div>
				<div className='visible zed-lg:hidden'>
					<div>
						{open ? (
							<X onClick={() => setOpen(false)} />
						) : (
							<Menu onClick={() => setOpen(true)} />
						)}
					</div>
					{open && (
						<div
							className={`absolute top-16 right-2 z-10 bg-bg shadow-md shadow-primary p-4 rounded-lg transition-opacity duration-500 ${
								open ? 'opacity-100' : 'opacity-0'
							}`}
						>
							<ul className='flex flex-col gap-y-2'>
								{MENU.map(item => (
									<Modal key={item.title}>
										<ModalTrigger>
											<Button
												title={item.title}
												className='text-center w-full text-sm py-1 px-2 active:bg-tertiary'
											/>
										</ModalTrigger>
										<ModalBody>
											<ModalContent>
												{item.title === 'Подписаться' ? (
													<RegisterForm />
												) : (
													<LoginForm />
												)}
											</ModalContent>
										</ModalBody>
									</Modal>
								))}
							</ul>
						</div>
					)}
				</div>
				<div className='hidden zed-lg:flex zed-lg:gap-x-3'>
					{MENU.map(item => (
						<Modal key={item.title}>
							<ModalTrigger>
								<Button
									title={item.title}
									className='py-2 px-4 hover:bg-tertiary'
								/>
							</ModalTrigger>
							<ModalBody>
								<ModalContent>
									{item.title === 'Подписаться' ? <RegisterForm /> : <LoginForm />}
								</ModalContent>
							</ModalBody>
						</Modal>
					))}
				</div>
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
