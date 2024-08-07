import Link from 'next/link'

export const Footer = () => {
	return (
		<footer className='px-2 w-full text-center z-10 zed-lg:text-md zed-xl:text-lg zed-xl:bottom-1 zed-xl:fixed zed-xl:left-1/2 zed-xl:-translate-x-1/2'>
			<p className='hidden lg:block'>
				&copy; Разработанно при поддержке{' '}
				<Link
					href='https://cyberprotect.ru/'
					target='_blank'
					rel='noopener noreferrer'
					className='font-semibold text-tertiary transition-colors hover:text-primary'
				>
					ООО «Киберпротект»
				</Link>{' '}
				в 2024 году
			</p>
			<p className='block zed-lg:hidden'>
				&copy;{' '}
				<Link
					href='https://cyberprotect.ru/'
					target='_blank'
					rel='noopener noreferrer'
					className='font-semibold text-tertiary transition-colors hover:text-primary'
				>
					ООО «Киберпротект»
				</Link>
				{', '}
				2024
			</p>
		</footer>
	)
}
