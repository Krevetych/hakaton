import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		extend: {
			colors: {
				bg: '#18181B',
				primary: '#00204d',
				secondary: '#17527E',
				tertiary: '#387DC0',
				quaternary: '#83D0F5'
			}
		}
	},
	plugins: []
}
export default config
