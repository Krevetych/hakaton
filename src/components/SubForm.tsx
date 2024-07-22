import { Input } from '@nextui-org/react'

export const SubForm = () => {
	return (
		<div className='flex w-full flex-wrap zed-xl:flex-nowrap gap-4'>
			<p className='text-center font-semibold uppercase'>Подписаться</p>
			<Input type='email' label='Email' />
		</div>
	)
}
