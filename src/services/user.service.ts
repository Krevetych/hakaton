import { TUserResponse, TUserSpamResponse } from '@/types/user.types'

import { axiosWithAuth } from '@/api/interceptors'

class UserService {
	private URL = '/user/'
	private disableSpamURL = `${this.URL}/disable-even-spam/`
	private enableSpamURL = `${this.URL}/enable-even-spam/`

	async getUser(): Promise<TUserResponse> {
		const response: TUserResponse = await axiosWithAuth.get(this.URL)

		return response
	}

	async disableSpam(): Promise<TUserSpamResponse> {
		const response: TUserSpamResponse = await axiosWithAuth.post(this.disableSpamURL)

		return response
	}

	async enableSpam(): Promise<TUserSpamResponse> {
		const response: TUserSpamResponse = await axiosWithAuth.post(this.enableSpamURL)

		return response
	}
}

export const userService = new UserService()
