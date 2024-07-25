import { ISuccess } from './success.types'

interface UserData {
	username: string
	spam_subscribe: boolean
	email: string
	telegram: string
	date_joined: Date
}

interface IUser extends ISuccess {
	data: {
		data: UserData
	}
}

interface IUserSpam extends ISuccess {
	data: null
}

export type TUserResponse = IUser
export type TUserSpamResponse = IUserSpam
