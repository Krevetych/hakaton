'use client'

import { Checkbox } from '@nextui-org/checkbox'
import { PropsWithChildren, useState } from 'react'

export const CheckboxButton = ({ children }: PropsWithChildren) => {
	const [isSelected, setIsSelected] = useState(true)

	return (
		<Checkbox
			color='secondary'
			required={true}
			defaultSelected
			isSelected={isSelected}
			onValueChange={setIsSelected}
		>
			{children}
			<p className='text-red-500'>{!isSelected ? 'Необходимо согласие' : ''}</p>
		</Checkbox>
	)
}
