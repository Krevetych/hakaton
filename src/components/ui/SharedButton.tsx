import { Copy, SquareArrowOutUpRight } from 'lucide-react'
import { useMediaQuery } from 'react-responsive'
import { toast } from 'sonner'

export const SharedButton = ({ url }: { url: string }) => {
	const isMD = useMediaQuery({ maxWidth: 425 })

	const handleCopy = (url: string) => {
		try {
			navigator.clipboard.writeText(url)
			toast.success('Ссылка скопирована в буфер обмена')
		} catch (error) {
			toast.error('Не удалось скопировать ссылку в буфер обмена')
		}
	}

	const handleShare = (url: string) => {
		if (navigator.share) {
			try {
				navigator.share({
					title: 'Прочитай это и будь в безопасности',
					url: url
				})
				toast.success('Вы поделились ссылкой')
			} catch (error) {
				toast.error('Не удалось поделиться ссылкой')
			}
		}
	}

	return (
		<div>
			{isMD ? (
				<SquareArrowOutUpRight size={16} onClick={() => handleShare(url)} />
			) : (
				<Copy size={16} onClick={() => handleCopy(url)} />
			)}
		</div>
	)
}
