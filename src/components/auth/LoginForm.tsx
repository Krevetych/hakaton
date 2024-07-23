import { Button } from '@nextui-org/button'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'

import { TLoginFormState } from '@/types/auth.types'

import { Heading } from '../Heading'
import { Field } from '../ui/Field'

import { authService } from '@/services/auth.service'

export const LoginForm = () => {
	const { register, handleSubmit, reset } = useForm<TLoginFormState>({
		mode: 'onChange'
	})

	const { refresh } = useRouter()

	const { mutate } = useMutation({
		mutationKey: ['login'],
		mutationFn: (data: TLoginFormState) => authService.login(data),
		onSuccess: () => {
			reset()
			refresh()
		}
	})

	const onSubmit: SubmitHandler<TLoginFormState> = data => {
		mutate(data)
	}

	return (
		<form
			className='flex w-full flex-wrap zed-xl:flex-nowrap gap-4'
			onSubmit={handleSubmit(onSubmit)}
		>
			<Heading title='Авторизоваться' />
			<div className='flex flex-col gap-y-5 w-full'>
				<Field
					id='email'
					label='Email'
					placeholder='Ваш email'
					type='email'
					{...register('email', { required: 'Email обязателен' })}
				/>
				<Field
					id='password'
					label='Password'
					placeholder='Ваш password'
					type='password'
					{...register('password', { required: 'Password обязателен' })}
				/>
				<Button className='font-black' color='secondary'>
					Авторизоваться
				</Button>
			</div>
		</form>
	)
}
