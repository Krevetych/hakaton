'use client'

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import Loader from '@/components/ui/Loader'

import { eventService } from '@/services/event.service'

export const Event = () => {
	const { id } = useParams()

	const { data, isLoading } = useQuery({
		queryKey: ['eventId'],
		queryFn: () => eventService.getById(eventId),
		enabled: !!id,
		select: data => data.data.data,
		retry: false
	})

	if (typeof id !== 'string') {
		return null
	}

	const [eventId, _] = id.split('-')

	return (
		<div>
			<Header />
			{isLoading ? (
				<Loader />
			) : (
				<main>
					<h1>{data?.title}</h1>
					<p>Описание: {data?.description}</p>
					<p>Дополнительное описание: {data?.description_over}</p>
				</main>
			)}
			<Footer />
		</div>
	)
}
