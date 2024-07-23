export interface IAuth {
	email: string
	login: string
	telegram: string
	password: string
}

export type TRegisterFormState = Omit<IAuth, 'password'>
export type TLoginFormState = Omit<IAuth, 'login' | 'telegram'>
