import { ISuccess } from './success.types'

interface IAuth {
	email: string
	username: string
	telegram: string
	password: string
}

interface IAuthResponse extends ISuccess {
	data: null
}

export type TRegisterFormState = Omit<IAuth, 'password'>
export type TLoginFormState = Omit<IAuth, 'login' | 'telegram'>
export type TChangePasswordFormState = Omit<
	IAuth,
	'login' | 'password' | 'telegram'
>
export type TAuthResponse = IAuthResponse
