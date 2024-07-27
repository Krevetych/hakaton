import { ISuccess } from './success.types'

interface EventData {
	id: number
	title: string
	description: string
	description_over?: string
	date_open: Date
}

interface IEvent extends ISuccess {
	data: {
		data: EventData[]
	}
}

export type TEventResponse = IEvent
