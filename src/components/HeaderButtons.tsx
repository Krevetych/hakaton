import { Menu, X } from 'lucide-react'
import { useState } from 'react'

import { MENU } from '@/constants/menu.constants'

import { TUserResponse } from '@/types/user.types'

import { LoginForm } from './auth/LoginForm'
import { RegisterForm } from './auth/RegisterForm'
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalTrigger
} from './ui/AnimatedModal'
import { Button } from './ui/Button'
import { useAuth } from '@/hooks/useAuth'

export const HeaderButtons = () => {
	const [open, setOpen] = useState(false)
	const {data, isLoading, isSuccess} = useAuth()

	console.log('Header button:', data?.email)

	return (
		<>
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
						{isLoading ? (
							<p>Загрузка...</p>
						) : isSuccess && data ? (
							<p>{data.email}</p>
						) : (
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
						)}
					</div>
				)}
			</div>
			<div className='hidden zed-lg:flex zed-lg:gap-x-3'>
				{isLoading ? (
					<p>Загрузка...</p>
				) : isSuccess && data ? (
					<p>{data.email}</p>
				) : (
					MENU.map(item => (
						<Modal key={item.title}>
							<ModalTrigger>
								<Button
									title={item.title}
									className='py-2 px-4 hover:bg-tertiary'
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
					))
				)}
			</div>
		</>
	)
}
