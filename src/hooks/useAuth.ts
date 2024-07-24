import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { userService } from '../services/user.service'

export const useAuth = () => {
	const { data, isLoading, isSuccess } = useQuery({
		queryKey: ['auth'],
		queryFn: () => userService.getUser()
	})

	const searchParams = useSearchParams()

	const [loggedIn, setLoggedIn] = useState(false)

	useEffect(() => {
		if (searchParams.get('token') === 'missing') {
			setLoggedIn(false)
		}
	}, [searchParams])

	return {
		data,
		isLoading,
		isSuccess,
		loggedIn,
		setLoggedIn
	}
}
