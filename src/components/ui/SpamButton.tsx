import cn from 'clsx'

interface ISpam {
	onClick: () => void
	className: string
	title: string
}

export const SpamButton = ({ onClick, className, title }: ISpam) => {
	return (
		<button
			className={cn(
				className,
				'rounded-md flex item-center justify-center px-1 ml-2 text-sm border-solid border bg-transparent'
			)}
			onClick={onClick}
		>
			{title}
		</button>
	)
}
