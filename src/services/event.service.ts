import { TEventResponse, TSingleEventResponse } from '@/types/event.types'

import { axiosZed } from '@/api/interceptors'

class EventService {
	private URL = '/event'
	private allEventsURL = `${this.URL}/all/`
	private userEventsURL = `${this.URL}/user/`

	async getAllEvents(): Promise<TEventResponse> {
		const response: TEventResponse = await axiosZed.get(this.allEventsURL)

		return response
	}

	async getById(id: string): Promise<TSingleEventResponse> {
		const response: TSingleEventResponse = await axiosZed.get(
			`${this.URL}/${id}`
		)

		return response
	}

	async getUserEvents(): Promise<TEventResponse> {
		const response: TEventResponse = await axiosZed.get(this.userEventsURL)

		return response
	}
}

export const eventService = new EventService()
