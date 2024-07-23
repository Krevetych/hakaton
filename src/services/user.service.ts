import { TUserResponse, TUserSpamResponse } from '@/types/user.types'

import { axiosZed } from '@/api/interceptors'

class UserService {
	private URL = '/user'
	private disableSpamURL = `${this.URL}/disable-even-spam`
	private enableSpamURL = `${this.URL}/enable-even-spam`

	async getUser(): Promise<TUserResponse> {
		const response: TUserResponse = await axiosZed.get(this.URL)

		return response
	}

	async disableSpam(): Promise<TUserSpamResponse> {
		const response: TUserSpamResponse = await axiosZed.post(this.disableSpamURL)

		return response
	}

	async enableSpam(): Promise<TUserSpamResponse> {
		const response: TUserSpamResponse = await axiosZed.post(this.enableSpamURL)

		return response
	}
}

export const userService = new UserService()
