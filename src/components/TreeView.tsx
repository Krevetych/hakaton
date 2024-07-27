import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover'
import { Tooltip } from '@nextui-org/tooltip'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useMediaQuery } from 'react-responsive'

import { useIsClient } from '@/hooks/useIsClient'

import { Ball } from './ui/Ball'
import { eventService } from '@/services/event.service'

interface ITree {
	number: number
	currentDate?: number
}

interface ITooltip {
	number: number
	title?: string
	description?: string
	description_over?: string
	eventId?: number
}

const TooltipContent = ({
	number,
	title,
	description,
	description_over,
	eventId
}: ITooltip) => {
	const showMore = description_over && description_over.length > 0
	const isLongText =
		(description?.length || 0) + (description_over?.length || 0) > 250

	return (
		<div className='flex flex-col gap-y-2 h-fit'>
			<p className='font-semibold text-lg'>
				<span>День {number}</span>: {title}
			</p>
			<hr />
			<p className='text-lg'>
				{description}
				{isLongText && '...'}
			</p>
			{showMore && (
				<>
					<p className='text-lg'>
						{description_over?.substring(0, 200)}
						{description_over?.length > 20 && '...'}
					</p>
					<Link
						href={`/events/${eventId}`}
						className='text-white hover:underline mt-2'
					>
						Подробнее
					</Link>
				</>
			)}
		</div>
	)
}

export const TreeView = ({ number, currentDate }: ITree) => {
	const { data } = useQuery({
		queryKey: ['events'],
		queryFn: () => eventService.getAllEvents(),
		retry: false,
		select: data => data.data.data
	})

	const events = data || []

	const event = events.find(item => {
		const date = new Date(item.date_open)
		return date.getDate() === number
	})

	const today = new Date().getDate()
	if (currentDate === undefined) currentDate = today

	const isClient = useIsClient()
	const isLG = useMediaQuery({ minWidth: 1024 })

	const isPastOrToday = number <= today
	const ballSrc = isPastOrToday ? './ball2.png' : './ball.png'

	const tooltipContent = event ? (
		<TooltipContent
			number={number}
			title={event.title}
			description={event.description}
			description_over={event.description_over}
			eventId={event.id}
		/>
	) : (
		<TooltipContent
			number={number}
			title='No Event'
			description='No event details available for this date.'
		/>
	)

	return (
		<>
			{isClient && isLG ? (
				isPastOrToday ? (
					<Tooltip
						content={tooltipContent}
						color='primary'
						placement='top'
						showArrow={true}
						className='w-72 rounded-xl p-4'
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
					<PopoverContent className='w-72 rounded-xl p-4'>
						{tooltipContent}
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
