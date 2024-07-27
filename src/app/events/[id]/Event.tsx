'use client'

import { useParams } from 'next/navigation'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

export const Event = () => {
	const { id } = useParams()

	if (typeof id !== 'string') {
		return <p>Invalid ID format</p>
	}

	const [eventId, day] = id.split('-')

	return (
		<div>
			<Header />
			<p>Event: {eventId}</p>
			<p>Day: {day}</p>
			<Footer />
		</div>
	)
}
