import { Text } from '../Text'
import { ArrowDownButton } from '../ui/ArrrowDownButton'
import { TextGenerateEffect } from '../ui/TextGenerateEffect'

export const MainComponent = () => {
	return (
		<div className='p-3 flex items-center justify-center flex-col relative zed-xl:h-[80vh]'>
			<TextGenerateEffect
				words='Кибербезопасный Новый Год'
				className='text-3xl font-black lg:text-center lg:text-5xl 2xl:text-6xl'
			/>
			<TextGenerateEffect
				words='31 шаг на пути к вашей цифровой безопасности'
				className='text-quaternary font-semibold text-xl lg:text-center lg:text-2xl 2xl:text-3xl'
			/>
			<Text />
			<ArrowDownButton />
		</div>
	)
}
