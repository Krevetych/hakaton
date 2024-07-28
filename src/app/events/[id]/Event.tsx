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
				<main className='my-2 mx-2 flex flex-col gap-y-2 item-center justify-center zed-lg:mx-20 zed-lg:my-8 zed-xl:mx-60 zed-xl:my-5 zed-xl:gap-y-5'>
					<h1 className='text-2xl zed-lg:text-justify font-black zed-lg:text-3xl zed-xl:text-5xl'>
						{data?.title}
					</h1>
					<div>
						<p className='text-md zed-lg:text-justify zed-lg:text-lg zed-xl:text-xl'>
							{data?.description}
						</p>
						<p className='text-md zed-lg:text-justify zed-lg:text-lg zed-xl:text-xl'>
							{data?.description_over}
						</p>
					</div>
				</main>
			)}
			<Footer />
		</div>
	)
}
