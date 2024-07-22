'use client'

import { useEffect } from 'react'

import { Footer } from '@/components/Footer'
import { Forest } from '@/components/Forest'
import { Header } from '@/components/Header'
import { SnowfallComponent } from '@/components/Snowfall'
import { About } from '@/components/pages/About'
import { AdventComponent } from '@/components/pages/AdventComponent'
import { MainComponent } from '@/components/pages/MainComponent'

export function Home() {
	useEffect(() => {
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
	}, [])

	return (
		<div className='overflow-hidden'>
			<SnowfallComponent />
			<section className='h-screen'>
				<Header />
				<MainComponent />
				<Forest />
			</section>
			<section className='h-screen'>
				<AdventComponent />
			</section>
			<section className='h-screen'>
				<About />
				<Footer />
			</section>
		</div>
	)
}
