'use client'

import { Button } from '@nextui-org/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { TChangePasswordFormState, TLoginFormState } from '@/types/auth.types'

import { Heading } from '../../components/Heading'
import { Field } from '../../components/ui/Field'

import { authService } from '@/services/auth.service'

export const LoginForm = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<TLoginFormState>({
		mode: 'onChange'
	})

	const queryClient = useQueryClient()
	const [isPasswordChanged, setIsPasswordChanged] = useState(false)

	const { mutate: changePasswordMutate, error: passwordError } = useMutation({
		mutationKey: ['changePassword'],
		mutationFn: (data: TChangePasswordFormState) =>
			authService.changePassword(data),
		onSuccess: () => {
			setIsPasswordChanged(true)
		}
	})

	const { mutate: loginMutate, error: loginError } = useMutation({
		mutationKey: ['login'],
		mutationFn: (data: TLoginFormState) => authService.login(data),
		onSuccess: () => {
			reset()
			window.location.reload()
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
				{errors.email && <p className='text-red-500'>{errors.email.message}</p>}

				{isPasswordChanged && (
					<Field
						id='password'
						label='Password'
						placeholder='Ваш password'
						type='password'
						{...register('password', { required: 'Password обязателен' })}
					/>
				)}
				{errors.password && (
					<p className='text-red-500'>{errors.password.message}</p>
				)}
				{loginError && <p className='text-red-500'>{loginError.message}</p>}
				{passwordError && (
					<p className='text-red-500'>{passwordError.message}</p>
				)}
				<Button className='font-black' color='secondary' type='submit'>
					{isPasswordChanged ? 'Авторизоваться' : 'Получить пароль'}
				</Button>
			</div>
		</form>
	)
}
