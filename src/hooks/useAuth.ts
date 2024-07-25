import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'

import { userService } from '../services/user.service'

export const useAuth = () => {
	const sessionId = Cookies.get('sessionId')

	const { data, isLoading, isSuccess, isError } = useQuery({
		queryKey: ['user'],
		queryFn: () => userService.getUser(),
		enabled: !!sessionId,
		retry: false
	})

	console.log(data)

	return {
		data,
		isLoading,
		isSuccess,
		isError
	}
}
