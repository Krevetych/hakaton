import cn from 'clsx'

import { IButtonProps } from '@/types/components.types'

export const Button = ({ title, className }: IButtonProps) => {
	return (
		<div
			className={cn(
				className,
				'bg-secondary text-white rounded-lg font-semibold transition-colors duration-500 relative'
			)}
		>
			{title}
		</div>
	)
}
