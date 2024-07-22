import Link from 'next/link'

export const Footer = () => {
	return (
		<footer className='px-2 fixed bottom-0 left-1/2 -translate-x-1/2 w-full text-center z-10 lg:text-md 2xl:text-lg 2xl:bottom-1'>
			<p className='hidden lg:block'>
				&copy; Разработанно при поддержке{' '}
				<Link
					href='https://cyberprotect.ru/'
					className='font-semibold text-tertiary transition-colors hover:text-primary'
				>
					ООО «Киберпротект»
				</Link>{' '}
				в 2024 году
			</p>
			<p className='block lg:hidden'>
				&copy;{' '}
				<Link
					href='https://cyberprotect.ru/'
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
