import Link from 'next/link'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

import { SPONSORS } from '@/constants/sponsor.constants'

import ImagePreview from '../ImagePreview'
import ReadMore from '../ReadMore'

export const About = () => {
	return (
		<main className='p-3 flex items-center justify-center flex-col'>
			<h1 className='text-3xl font-black zed-lg:text-center zed-lg:text-5xl zed-xl:text-6xl'>
				Узнайте больше о цифровой безопасности вместе с{' '}
				<Link href='https://cyberprotect.ru' className='text-tertiary'>
					Киберпротектом
				</Link>
			</h1>

			<Carousel
				infiniteLoop
				showArrows={false}
				showIndicators={false}
				showStatus={false}
				showThumbs={false}
				autoPlay
				interval={5000}
				className='mt-10 hidden zed-lg:block zed-lg:max-w-6xl'
			>
				{SPONSORS.map(sponsor => (
					<div className='flex flex-col gap-y-3 p-5' key={sponsor.id}>
						<ImagePreview src={sponsor.img} alt={sponsor.alt} />
						<p className='zed-xl:text-lg'>{sponsor.text}</p>
					</div>
				))}
			</Carousel>
			<div className='flex flex-col items-center justify-center gap-y-3 mt-5 zed-lg:hidden'>
				<div className='flex flex-col gap-y-3'>
					{SPONSORS.map(sponsor => (
						<div key={sponsor.id} className='flex flex-col gap-y-2'>
							<ImagePreview src={sponsor.img} alt={sponsor.alt} />
							<ReadMore
								text={sponsor.text}
								title={sponsor.title}
								link={sponsor.link}
							/>
						</div>
					))}
				</div>
			</div>
		</main>
	)
}

export default About
