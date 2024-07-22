import { ArrowDown } from 'lucide-react'

export const ArrowDownButton = () => {
	const scrollToNextSection = () => {
		const nextSection = Array.from(document.querySelectorAll('section')).find(
			section => section.getBoundingClientRect().top > 0
		)

		if (nextSection) {
			window.scrollTo({
				top: nextSection.offsetTop,
				behavior: 'smooth'
			})
		}
	}

	return (
		<div className='absolute -bottom-10 flex items-center justify-center lg:-bottom-0'>
			<div
				className='animate-bounce cursor-pointer'
				onClick={scrollToNextSection}
			>
				<div className='border-solid border-white border-2 rounded-full p-1'>
					<ArrowDown size={24} className='text-white' />
				</div>
			</div>
		</div>
	)
}
