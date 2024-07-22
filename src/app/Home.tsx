'use client'

import { useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'

import { Footer } from '@/components/Footer'
import { Forest } from '@/components/Forest'
import { Header } from '@/components/Header'
import { SnowfallComponent } from '@/components/Snowfall'
import { About } from '@/components/pages/About'
import { AdventComponent } from '@/components/pages/AdventComponent'
import { MainComponent } from '@/components/pages/MainComponent'

export function Home() {
	const isXL = useMediaQuery({ minWidth: 1280 })

	useEffect(() => {
		if (!isXL) return

		const handleScroll = (event: WheelEvent) => {
			event.preventDefault()
			const scrollAmount = window.innerHeight
			window.scrollBy({
				top: event.deltaY > 0 ? scrollAmount : -scrollAmount,
				behavior: 'smooth'
			})
		}

		window.addEventListener('wheel', handleScroll, { passive: false })

		return () => {
			window.removeEventListener('wheel', handleScroll)
		}
	}, [isXL])

	return (
		<div className='overflow-hidden'>
			<SnowfallComponent />
			<section className='zed-xl:h-screen'>
				<Header />
				<MainComponent />
				<Forest />
			</section>
			<section className='zed-xl:h-screen'>
				<AdventComponent />
			</section>
			<section className='zed-xl:h-screen'>
				<About />
				<Footer />
			</section>
		</div>
	)
}
