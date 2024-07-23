import { nextui } from '@nextui-org/theme'
import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@nextui-org/theme/dist/components/(button|popover|ripple|spinner).js'
	],
	theme: {
		extend: {
			colors: {
				bg: '#18181B',
				primary: '#00204d',
				secondary: '#17527E',
				tertiary: '#387DC0',
				quaternary: '#83D0F5'
			},
			screens: {
				zed: '320px',
				'zed-lg': '1024px',
				'zed-xl': '1280px',
				'zed-max': '1920px'
			}
		}
	},
	plugins: [nextui()]
}
export default config
