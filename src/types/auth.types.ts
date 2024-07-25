import { ISuccess } from './success.types'

interface IAuth {
	email: string
	username: string
	telegram: string
	offset: number
	password: string
}

interface IAuthResponse extends ISuccess {
	data: null
}

export type TRegisterFormState = Omit<IAuth, 'password'>
export type TLoginFormState = Omit<IAuth, 'login' | 'telegram' | 'offset'>
export type TChangePasswordFormState = Omit<
	IAuth,
	'login' | 'password' | 'telegram' | 'offset'
>
export type TAuthResponse = IAuthResponse
