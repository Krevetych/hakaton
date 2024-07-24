import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover'
import { Tooltip } from '@nextui-org/tooltip'
import { useMediaQuery } from 'react-responsive'

import { useIsClient } from '@/hooks/useIsClient'

import { Ball } from './ui/Ball'

interface ITree {
	number: number
	currentDate?: number
}

export const TreeView = ({ number, currentDate }: ITree) => {
	const isClient = useIsClient()
	const isLG = useMediaQuery({ minWidth: 1024 })

	const today = new Date().getDate()
	if (currentDate === undefined) currentDate = today
	const isPastOrToday = number <= currentDate

	const ballSrc = isPastOrToday ? './ball2.png' : './ball.png'

	const TooltipContent = (
		<div className='w-72 max-h-[85vh] rounded-xl p-4'>
			{number}, Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
			ducimus perspiciatis beatae nulla nam reiciendis necessitatibus voluptatem
			id, dicta excepturi ipsa consectetur porro incidunt eius. Quas dolor culpa
			officia perspiciatis tempore consectetur perferendis autem nesciunt
			officiis. Eos eum aliquid maxime quisquam fugiat. Ex iusto non voluptas
			sed illum numquam similique!
		</div>
	)

	return (
		<>
			{isClient && isLG ? (
				isPastOrToday ? (
					<Tooltip
						content={TooltipContent}
						color='primary'
						placement='top'
						showArrow={true}
						className='w-72 max-h-[85vh] rounded-xl p-4'
					>
						<div className='relative cursor-pointer'>
							<Ball number={number} src={ballSrc} isPast={isPastOrToday} />
						</div>
					</Tooltip>
				) : (
					<div className='relative cursor-pointer'>
						<Ball number={number} src={ballSrc} isPast={isPastOrToday} />
					</div>
				)
			) : isPastOrToday ? (
				<Popover showArrow={true} color='primary'>
					<PopoverTrigger>
						<div>
							<Ball number={number} src={ballSrc} isPast={isPastOrToday} />
						</div>
					</PopoverTrigger>
					<PopoverContent className='w-72 max-h-[85vh] rounded-xl p-4'>
						<p>{TooltipContent}</p>
					</PopoverContent>
				</Popover>
			) : (
				<div>
					<Ball number={number} src={ballSrc} isPast={isPastOrToday} />
				</div>
			)}
		</>
	)
}
