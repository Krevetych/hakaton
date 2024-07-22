import React from 'react'

import { TreeView } from './TreeView'

const Tree: React.FC = () => {
	const numbers = Array.from({ length: 31 }, (_, i) => i + 1)

	const createLevels = () => {
		const levels = []
		let count = 1
		let levelSize = 1

		while (count <= numbers.length) {
			levels.push(numbers.slice(count - 1, count - 1 + levelSize))
			count += levelSize
			levelSize += 1
		}

		return levels
	}

	const levels = createLevels()

	return (
		<div className='relative flex flex-col items-center justify-center w-full mt-5 lg:justify-normal lg:mt-3 zed-xl:h-[85vh]'>
			{levels.map((level, i) => (
				<div
					key={i}
					className='relative flex justify-center'
					style={{ marginBottom: i === levels.length - 1 ? '3rem' : '1rem' }}
				>
					{level.map((number, idx) => (
						<TreeView number={number} key={idx} />
					))}
				</div>
			))}
			<div
				className='absolute bottom-10 flex items-center justify-center'
				style={{ left: '50%', transform: 'translateX(-50%)' }}
			>
				<div className='w-16 h-16 bg-brown-500 rounded-full'></div>
			</div>
		</div>
	)
}

export default Tree
