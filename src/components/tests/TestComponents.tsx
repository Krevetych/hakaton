'use client'

import { ChangeEvent, useState } from 'react'

import { TreeView } from '../TreeView'

const TestComponent = () => {
	const [currentDate, setCurrentDate] = useState(new Date().getDate())

	const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
		setCurrentDate(parseInt(event.target.value, 10))
	}

	return (
		<div>
			<label htmlFor='current-date'>Выберите дату: </label>
			<input
				type='number'
				id='current-date'
				value={currentDate}
				onChange={handleDateChange}
				className='text-black'
				min='1'
				max='31'
			/>
			<div className='flex flex-wrap'>
				{Array.from({ length: 31 }, (_, i) => i + 1).map(number => (
					<TreeView key={number} number={number} currentDate={currentDate} />
				))}
			</div>
		</div>
	)
}

export default TestComponent
