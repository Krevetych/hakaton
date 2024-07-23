'use client'

import { NextUIProvider } from '@nextui-org/system'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren, ReactNode, useState } from 'react'

import { ModalContext } from '@/hooks/useModal'

export function Providers({ children }: PropsWithChildren) {
	const [client] = useState(
		new QueryClient({
			defaultOptions: {
				queries: {
					refetchOnWindowFocus: false
				}
			}
		})
	)

	return (
		<QueryClientProvider client={client}>
			<NextUIProvider>{children}</NextUIProvider>
		</QueryClientProvider>
	)
}

export const ModalProvider = ({ children }: { children: ReactNode }) => {
	const [open, setOpen] = useState(false)

	return (
		<ModalContext.Provider value={{ open, setOpen }}>
			{children}
		</ModalContext.Provider>
	)
}
