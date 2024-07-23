import {
	TAuthResponse,
	TLoginFormState,
	TRegisterFormState
} from '@/types/auth.types'

import { axiosZed } from '@/api/interceptors'

class AuthService {
	private loginURL = '/login'
	private registerURL = '/register'

	async login(data: TLoginFormState): Promise<TAuthResponse> {
		const response: TAuthResponse = await axiosZed.post(this.loginURL, data)

		return response
	}

	async register(data: TRegisterFormState): Promise<TAuthResponse> {
		const response: TAuthResponse = await axiosZed.post(this.registerURL, data)

		return response
	}
}

export const authService = new AuthService()
