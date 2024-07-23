import { Button } from '@nextui-org/button'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'

import { TRegisterFormState } from '@/types/auth.types'

import { Heading } from '../Heading'
import { Field } from '../ui/Field'

import { authService } from '@/services/auth.service'

export const RegisterForm = () => {
	const { register, handleSubmit, reset } = useForm<TRegisterFormState>({
		mode: 'onChange'
	})

	const { refresh } = useRouter()

	const { mutate } = useMutation({
		mutationKey: ['register'],
		mutationFn: (data: TRegisterFormState) => authService.register(data),
		onSuccess: () => {
			reset()
			refresh()
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
				<Field
					id='email'
					label='Email'
					placeholder='Ваш email'
					type='email'
					{...register('email', { required: 'Email обязателен' })}
				/>
				<Field
					id='login'
					label='Login'
					placeholder='Ваш login'
					type='text'
					{...register('login', { required: 'Login обязателен' })}
				/>
				<Field
					id='telegram'
					label='Telegram username'
					placeholder='Ваш telegram username'
					type='text'
					{...register('telegram', {
						required: 'Telegram username обязателен'
					})}
				/>
				<Button color='secondary' className='font-black'>
					Подписаться
				</Button>
			</div>
		</form>
	)
}
