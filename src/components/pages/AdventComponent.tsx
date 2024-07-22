import Tree from '../Tree'

export const AdventComponent = () => {
	return (
		<div className='p-3 flex flex-col items-center justify-center relative'>
			<h1 className='text-4xl font-black lg:text-center lg:text-6xl'>
				Календарь рекомендаций
			</h1>
			<div>
				<Tree />
			</div>
		</div>
	)
}
