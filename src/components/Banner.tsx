'use client'

import { Button } from '@nextui-org/button'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'

export const Banner = () => {
	const COOKIE = 'cookieConsent'

	const [showBanner, setShowBanner] = useState(false)

	useEffect(() => {
		const cookieConsent = Cookies.get(COOKIE)

		if (!cookieConsent) {
			setShowBanner(true)
		}
	}, [])

	const handleAccept = () => {
		Cookies.set(COOKIE, 'true', { expires: 365 })
		setShowBanner(false)
	}

	const handleReject = () => {
		const allCookies = Cookies.get()
		for (let cookie in allCookies) {
			Cookies.remove(cookie)
		}
		setShowBanner(true)
	}

	return (
		showBanner && (
			<div className='fixed bottom-3 right-3 bg-primary p-4 rounded-lg flex flex-col items-center justify-center gap-y-3'>
				<p className='font-semibold text-center'>
					Мы используем 🍪, потому что <br />
					без них вообще ничего не работает
				</p>
				<div>
					<Button onClick={handleAccept} color='secondary'>
						Хорошо
					</Button>
				</div>
			</div>
		)
	)
}
