'use client'

import { Button } from '@nextui-org/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { TChangePasswordFormState, TLoginFormState } from '@/types/auth.types'

import { Heading } from '../Heading'
import { Field } from '../ui/Field'

import { authService } from '@/services/auth.service'

export const LoginForm = () => {
	const { register, handleSubmit, reset } = useForm<TLoginFormState>({
		mode: 'onChange'
	})

	const { refresh } = useRouter()
	const queryClient = useQueryClient()
	const [isPasswordChanged, setIsPasswordChanged] = useState(false)

	const { mutate: changePasswordMutate } = useMutation({
		mutationKey: ['changePassword'],
		mutationFn: (data: TChangePasswordFormState) =>
			authService.changePassword(data),
		onSuccess: () => {
			setIsPasswordChanged(true)
		}
	})

	const { mutate: loginMutate } = useMutation({
		mutationKey: ['login'],
		mutationFn: (data: TLoginFormState) => authService.login(data),
		onSuccess: () => {
			reset()
			refresh()
			queryClient.invalidateQueries({ queryKey: ['user'] })
		}
	})

	const onSubmit: SubmitHandler<TLoginFormState> = data => {
		if (!isPasswordChanged) {
			changePasswordMutate(data)
		} else {
			loginMutate(data)
		}
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
				{isPasswordChanged && (
					<Field
						id='password'
						label='Password'
						placeholder='Ваш password'
						type='password'
						{...register('password', { required: 'Password обязателен' })}
					/>
				)}
				<Button className='font-black' color='secondary' type='submit'>
					{isPasswordChanged ? 'Авторизоваться' : 'Получить пароль'}
				</Button>
			</div>
		</form>
	)
}
