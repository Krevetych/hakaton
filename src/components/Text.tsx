import Link from 'next/link'

import { CREATORS } from '@/constants/creators.constants'

import { AnimatedTooltip } from './ui/AnimatedTooltip'

export const Text = () => {
	return (
		<div className='flex flex-col items-center justify-center zed-lg:px-20'>
			<p className='text-md my-5 zed-lg:w-3/4 zed-lg:text-xl zed-lg:text-center zed-xl:text-2xl'>
				Конец года – отличная возможность подвести итоги, сделать выводы и
				перейти на новый уровень. Шаг за шагом, выполняя простые советы и
				рекомендации экспертов компании{' '}
				<Link
					href='https://cyberprotect.ru'
					target='_blank'
					rel='noopener noreferrer'
					className='text-tertiary'
				>
					«Киберпротект»
				</Link>
				, вы сможете обезопасить себя и своих близких в цифровой среде.
			</p>
			<div className='flex border-solid border-b border-slate-400 h-[1px] w-full zed-lg:hidden' />
			<div className='flex flex-col items-center justify-center gap-y-3 my-5 zed-lg:w-1/2'>
				<p className='text-lg font-semibold zed-lg:text-2xl'>Создано</p>
				<div className='flex items-center justify-center zed-xl:gap-x-10'>
					<AnimatedTooltip items={CREATORS} />
				</div>
			</div>
		</div>
	)
}
