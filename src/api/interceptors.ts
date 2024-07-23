import axios, { CreateAxiosDefaults } from 'axios'

import { API_URL } from '@/constants/url.constants'

const options: CreateAxiosDefaults = {
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json'
	}
}

const axiosZed = axios.create(options)

export { axiosZed }
