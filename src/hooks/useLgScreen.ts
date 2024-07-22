import { useEffect, useState } from 'react'

export const useLgScreen = () => {
	const [isLgScreen, setIsLgScreen] = useState<boolean>(false)

	useEffect(() => {
		const handleResize = () => {
			setIsLgScreen(window.innerWidth >= 1024)
		}

		handleResize()

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])
	return isLgScreen
}
