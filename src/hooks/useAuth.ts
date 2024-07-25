import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'

import { userService } from '../services/user.service'

export const useAuth = () => {
	const [sessionId, setSessionId] = useState<string | null>(null)

	useEffect(() => {
		const sessionId = document.cookie
			.split('; ')
			.find(row => row.startsWith('sessionid='))
			?.split('=')[1]

		console.log('SessionID: ', sessionId)

		if (sessionId) {
			localStorage.setItem('sessionid', sessionId)
			setSessionId(sessionId)
		}
	}, [])

	const { data, isLoading, isSuccess, isError } = useQuery({
		queryKey: ['user'],
		queryFn: () => userService.getUser(),
		
		enabled: !!sessionId,
		retry: false,
		select: data => data.data.data
	})

	console.log('UseAuth:', data?.email)
	console.log('UserAuth:', data?.username)

	return {
		data,
		isLoading,
		isSuccess,
		isError
	}
}
