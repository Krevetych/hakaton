import Link from 'next/link'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

import ImagePreview from '../ImagePreview'
import ReadMore from '../ReadMore'

export const About = () => {
	return (
		<main className='p-3 flex items-center justify-center flex-col'>
			<h1 className='text-3xl font-black lg:text-center lg:text-5xl 2xl:text-6xl'>
				Узнайте больше о цифровой безопасности вместе с{' '}
				<Link href='https://cyberprotect.ru' className='text-tertiary'>
					Киберпротектом
				</Link>
			</h1>

			<Carousel
				infiniteLoop
				showThumbs={false}
				autoPlay
				interval={5000}
				className='mt-10 hidden lg:block lg:max-w-6xl'
			>
				<div className='my-2 flex flex-col gap-y-3 p-5'>
					<ImagePreview src='./cyberprotect.png' alt='Cyberprotect' />
					<p className='2xl:text-lg'>
						<Link
							href='https://cyberprotect.ru'
							className='text-tertiary font-semibold'
						>
							«Киберпротект»
						</Link>{' '}
						— российский разработчик систем резервного копирования, защиты от
						утечки данных (DLP) и инфраструктурного программного обеспечения.
						Решениями компании пользуются организации любого масштаба, которые
						заинтересованы в надежной киберзащите, сохранности данных и
						работоспособности ИТ-инфраструктуры.
					</p>
				</div>

				<div className='flex flex-col gap-y-3 p-5'>
					<ImagePreview src='./cybercare.png' alt='Cybercare' />
					<p className='2xl:text-lg'>
						В 2021 году компания Киберпротект разработала и запустила бесплатный
						всероссийский проект по обучению детей и взрослых основам
						безопасного поведения в Интернете –{' '}
						<Link
							href='https://cybercare.ru'
							className='text-tertiary font-semibold'
						>
							Кибер Забота
						</Link>
						. В рамках проекта было разработано два бесплатных образовательных
						курса, дающих представление учителям и школьникам о современных
						киберугрозах и основных способах противодействия им, принципах
						безопасного общения и поведения в сети, безопасного хранения данных.
					</p>
				</div>
			</Carousel>
			<div className='flex flex-col items-center justify-center gap-y-3 mt-5 lg:hidden'>
				<div className='my-2 flex flex-col gap-y-3'>
					<ImagePreview src='./cyberprotect.png' alt='Cyberprotect' />
					<ReadMore
						text='«Киберпротект»
            — российский разработчик систем резервного копирования, защиты от утечки данных (DLP)
            и инфраструктурного программного обеспечения. Решениями компании пользуются
            организации любого масштаба, которые заинтересованы в надежной киберзащите,
            сохранности данных и работоспособности ИТ-инфраструктуры.'
						title='Киберпротект'
						link='https://cyberprotect.ru'
					/>
				</div>

				<div className='flex flex-col gap-y-3'>
					<ImagePreview src='./cybercare.png' alt='Cybercare' />
					<ReadMore
						text='В 2021 году компания Киберпротект разработала и запустила бесплатный всероссийский
            проект по обучению детей и взрослых основам безопасного поведения в Интернете – Кибер
            Забота . В рамках проекта было разработано два бесплатных образовательных курса,
            дающих представление учителям и школьникам о современных киберугрозах и основных
            способах противодействия им, принципах безопасного общения и поведения в сети,
            безопасного хранения данных.'
						title='Кибер Забота'
						link='https://cybercare.ru'
					/>
				</div>
			</div>
		</main>
	)
}

export default About
