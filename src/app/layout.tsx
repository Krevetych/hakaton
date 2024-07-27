import cn from 'clsx'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { Toaster } from 'sonner'

import { Banner } from '@/components/Banner'

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
			<body className={cn(zed.className, 'max-w-screen-zed-max mx-auto')}>
				<Providers>
					{children}
					<Banner />
					<Toaster theme='dark' position='bottom-right' duration={1500} />
				</Providers>
			</body>
		</html>
	)
}
