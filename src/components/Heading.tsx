interface IHeading {
	title: string
}

export const Heading = ({ title }: IHeading) => {
	return (
		<h1 className='text-center font-semibold uppercase zed-xl:text-2xl zed-xl:font-black'>
			{title}
		</h1>
	)
}
