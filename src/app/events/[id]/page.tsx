import type { Metadata } from 'next'

import { Event } from './Event'

export const metadata: Metadata = {
	title: 'Event',
	description: 'Страницы рекомендаций в видео лонгридов'
}

export default function EventPage() {
	return (
		<div>
			<Event />
		</div>
	)
}
