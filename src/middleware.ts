import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
	const { cookies } = request
	const sessionId = cookies.get('sessionid')
	
	if (sessionId) {
		const response = NextResponse.next()
		response.cookies.set('sessionid', sessionId.value)
		return response
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/']
}
