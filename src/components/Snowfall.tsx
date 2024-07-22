import { Snowfall } from 'react-snowfall'

export const SnowfallComponent = () => {
	return (
		<div className='fixed top-0 left-0 w-full h-full pointer-events-none z-50'>
			<Snowfall
				color='white'
				snowflakeCount={30}
				radius={[0.5, 2.0]}
				speed={[0.1, 0.5]}
				wind={[0.1, 0.5]}
			/>
		</div>
	)
}
