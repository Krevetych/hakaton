import axios, { CreateAxiosDefaults } from 'axios'

import { API_URL } from '@/constants/url.constants'

const baseOptions: CreateAxiosDefaults = {
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true
}

const authOptions: CreateAxiosDefaults = {
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true
}

const axiosZed = axios.create(baseOptions)
const axiosWithAuth = axios.create(authOptions)

export { axiosZed, axiosWithAuth }
