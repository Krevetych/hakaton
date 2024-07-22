export interface ISponsor {
	id: number
	title: string
	img: string
	alt: string
	link: string
	text: string
}

export type TReadMore = Omit<ISponsor, 'id' | 'img' | 'alt'>
