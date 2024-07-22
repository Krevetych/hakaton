import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover'
import { Tooltip } from '@nextui-org/tooltip'
import { useMediaQuery } from 'react-responsive'

import { Ball } from './ui/Ball'

interface ITree {
	number: number
}

export const TreeView = ({ number }: ITree) => {
	const isLG = useMediaQuery({ minWidth: 1024 })

	return (
		<>
			{isLG ? (
				<Tooltip
					content={`${number}, Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto ducimus perspiciatis beatae nulla nam reiciendis necessitatibus voluptatem id, dicta excepturi ipsa consectetur porro incidunt eius. Quas dolor culpa officia perspiciatis tempore consectetur perferendis autem nesciunt officiis. Eos eum aliquid maxime quisquam fugiat. Ex iusto non voluptas sed illum numquam similique!`}
					color='primary'
					placement='top'
					showArrow={true}
					className='w-72 max-h-[85vh] rounded-xl p-4'
				>
					<div className='relative cursor-pointer'>
						<Ball number={number} />
					</div>
				</Tooltip>
			) : (
				<Popover showArrow={true} color='primary'>
					<PopoverTrigger>
						<div>
							<Ball number={number} />
						</div>
					</PopoverTrigger>
					<PopoverContent className='w-72 max-h-[85vh] rounded-xl p-4'>
						<p>
							{number}, Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Iusto ducimus perspiciatis beatae nulla nam reiciendis
							necessitatibus voluptatem id, dicta excepturi ipsa consectetur
							porro incidunt eius. Quas dolor culpa officia perspiciatis tempore
							consectetur perferendis autem nesciunt officiis. Eos eum aliquid
							maxime quisquam fugiat. Ex iusto non voluptas sed illum numquam
							similique!
						</p>
					</PopoverContent>
				</Popover>
			)}
		</>
	)
}
