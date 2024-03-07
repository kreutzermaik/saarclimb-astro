/** @type {import('tailwindcss').Config} */

import {colors} from "./src/TailwindColors.js";

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './node_modules/flowbite/**/*.js'],
	theme: {
		extend: {},
		colors
	},
	plugins: [require('flowbite/plugin')],
}
