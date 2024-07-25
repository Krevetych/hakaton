import { Button } from '@nextui-org/button'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { TRegisterFormState } from '@/types/auth.types'

import { Heading } from '../Heading'
import { CheckboxButton } from '../ui/CheckboxButton'
import { Field } from '../ui/Field'

import { authService } from '@/services/auth.service'

export const RegisterForm = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<TRegisterFormState>({
		mode: 'onChange'
	})

	const { mutate, error } = useMutation({
		mutationKey: ['register'],
		mutationFn: (data: TRegisterFormState) => authService.register(data),
		onSuccess: () => {
			reset()
			window.location.reload()
		}
	})

	const onSubmit: SubmitHandler<TRegisterFormState> = data => {
		mutate(data)
	}

	return (
		<form
			className='flex w-full flex-wrap zed-xl:flex-nowrap gap-4'
			onSubmit={handleSubmit(onSubmit)}
		>
			<Heading title='Подписаться' />

			<div className='flex flex-col gap-y-5 w-full'>
				<div>
					<Field
						id='email'
						label='Email'
						placeholder='Ваш email'
						type='email'
						{...register('email', { required: 'Email обязателен' })}
					/>
					{errors.email && (
						<p className='text-red-500'>{errors.email.message}</p>
					)}
				</div>
				<div>
					<Field
						id='username'
						label='Username'
						placeholder='Ваш username'
						type='text'
						{...register('username', { required: 'Username обязателен' })}
					/>
					{errors.username && (
						<p className='text-red-500'>{errors.username.message}</p>
					)}
				</div>
				<div>
					<Field
						id='telegram'
						label='Telegram username'
						placeholder='Ваш telegram username'
						type='text'
						{...register('telegram', {
							required: 'Telegram username обязателен'
						})}
					/>
					{errors.telegram && (
						<p className='text-red-500'>{errors.telegram.message}</p>
					)}
				</div>
				<CheckboxButton>
					<Link
						href='https://cyberprotect.ru/privacy'
						target='_blank'
						rel='noopener noreferrer'
						className='text-white font-semibold transition-colors duration-300 underline hover:text-tertiary active:text-tertiary'
					>
						Согласие на обработку персональных данных
					</Link>
				</CheckboxButton>
				{error ? error.message : null}
				<Button color='secondary' type='submit' className='font-black'>
					Подписаться
				</Button>
			</div>
		</form>
	)
}
