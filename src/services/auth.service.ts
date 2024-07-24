import {
	TAuthResponse,
	TChangePasswordFormState,
	TLoginFormState,
	TRegisterFormState
} from '@/types/auth.types'

import { axiosZed } from '@/api/interceptors'

class AuthService {
	private loginURL = '/login'
	private registerURL = '/register'
	private changePasswordURL = '/change-password'

	async changePassword(data: TChangePasswordFormState): Promise<TAuthResponse> {
		const response: TAuthResponse = await axiosZed.post(
			this.changePasswordURL,
			data
		)

		return response
	}

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
