import { forwardRef } from 'react'

interface IInput {
	id: string
	label: string
	placeholder: string
	type?: string
}

export const Field = forwardRef<HTMLInputElement, IInput>(
	({ id, label, placeholder, type, ...rest }, ref) => {
		return (
			<div className='flex flex-col gap-y-1'>
				<label htmlFor={id} className='font-semibold'>
					{label}
				</label>
				<input
					type={type}
					ref={ref}
					id={id}
					placeholder={placeholder}
					className='p-2 rounded-lg text-primary font-semibold placeholder:text-secondary placeholder:font-normal w-full outline-none border-none'
					{...rest}
				/>
			</div>
		)
	}
)
