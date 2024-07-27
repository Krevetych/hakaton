import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { MENU } from '@/constants/menu.constants'

import { useAuth } from '@/hooks/useAuth'

import {
	Modal,
	ModalBody,
	ModalContent,
	ModalTrigger
} from './ui/AnimatedModal'
import { Button } from './ui/Button'
import Loader from './ui/Loader'
import { SpamButton } from './ui/SpamButton'
import { userService } from '@/services/user.service'
import { RegisterForm } from './auth/RegisterForm'
import { LoginForm } from './auth/LoginForm'

export const HeaderButtons = () => {
	const [open, setOpen] = useState(false)
	const [openPC, setOpenPC] = useState(false)
	const { data, isLoading } = useAuth()
	const queryClient = useQueryClient()

	const handleClick = () => {
		setOpenPC(!openPC)
	}

	const { mutate: disabledSpam } = useMutation({
		mutationKey: ['disableSpam'],
		mutationFn: () => userService.disableSpam(),
		onSuccess: () => {
			toast.success('Вы успешно отключили рассылку')
			queryClient.invalidateQueries({ queryKey: ['user'] })
		}
	})

	const { mutate: enabledSpam } = useMutation({
		mutationKey: ['enableSpam'],
		mutationFn: () => userService.enableSpam(),
		onSuccess: () => {
			toast.success('Вы успешно подключили рассылку')
			queryClient.invalidateQueries({ queryKey: ['user'] })
		}
	})

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
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
								{data ? (
									<div>
										<p>{data.email}</p>
										<SpamButton
											onClick={data.spam_subscribe ? disabledSpam : enabledSpam}
											className={
												data.spam_subscribe
													? 'border-red-500 text-red-500'
													: 'border-green-500 text-green-500'
											}
											title={
												data.spam_subscribe
													? 'Отключить рассылку'
													: 'Подключить рассылку'
											}
										/>
									</div>
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
						{data ? (
							<div
								className='cursor-pointer flex flex-col'
								onClick={handleClick}
							>
								<p>{data.email}</p>
								{openPC && (
									<SpamButton
										onClick={data.spam_subscribe ? disabledSpam : enabledSpam}
										className={
											data.spam_subscribe
												? 'border-red-500 text-red-500'
												: 'border-green-500 text-green-500'
										}
										title={
											data.spam_subscribe
												? 'Отключить рассылку'
												: 'Подключить рассылку'
										}
									/>
								)}
							</div>
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
			)}
		</>
	)
}
