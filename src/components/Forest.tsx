import Image from 'next/image'

export const Forest = () => {
	return (
		<div className='hidden -z-10 zed-xl:block'>
			<div>
				<Image
					width={203}
					height={802}
					src='/Sapin.png'
					alt='Sapin'
					className='absolute bottom-0 left-0'
				/>
			</div>
			<div>
				<Image
					width={193}
					height={599}
					src='/Sapin2.png'
					alt='Sapin2'
					className='absolute right-0 bottom-0'
				/>
			</div>
		</div>
	)
}
