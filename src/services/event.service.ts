import { TEventResponse } from '@/types/event.types'

import { axiosZed } from '@/api/interceptors'

class EventService {
	private URL = '/event'
	private allEventsURL = `${this.URL}/all`
	private userEventsURL = `${this.URL}/user`

	async getAllEvents(): Promise<TEventResponse> {
		const response: TEventResponse = await axiosZed.get(this.allEventsURL)

		return response
	}

	async getUserEvents(): Promise<TEventResponse> {
		const response: TEventResponse = await axiosZed.get(this.userEventsURL)

		return response
	}
}

export const eventService = new EventService()
