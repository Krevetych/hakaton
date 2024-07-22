import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'

import { SITE_NAME } from '@/constants/seo.constants'

import './globals.css'
import { Providers } from './providers'

const zed = Roboto({
	subsets: ['latin', 'cyrillic'],
	weight: ['100', '300', '400', '500', '700', '900'],
	display: 'swap',
	style: 'normal'
})

export const metadata: Metadata = {
	title: {
		default: SITE_NAME,
		template: `%s | ${SITE_NAME}`
	},
	description: '31 шаг на пути к вашей цифровой безопасности',
	icons: {
		icon: '/favicon.ico'
	}
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru' className='bg-bg text-slate-200'>
			<body className={zed.className}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
