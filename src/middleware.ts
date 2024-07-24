import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest, response: NextResponse) {
	const { cookies } = request

	const sessionId = cookies.get('sessionId')

	if (!sessionId) {
		const url = request.nextUrl.clone()
		url.searchParams.set('token', 'missing')
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/']
}
