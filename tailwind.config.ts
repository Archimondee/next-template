/** @type {import('tailwindcss').Config} */
const flattenColorPalette =
	require("tailwindcss/lib/util/flattenColorPalette").default
const safeListFile = "safelist.txt"

module.exports = {
	darkMode: ["class"],
	mode: "jit",
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	important: true,
	safelist: [
		{
			pattern: /grid-cols-./,
		},
	],
	theme: {
		fontFamily: {
			sans: [
				"Cabin",
				"Inter",
				"ui-sans-serif",
				"system-ui",
				"-apple-system",
				"BlinkMacSystemFont",
				"Segoe UI",
				"Roboto",
				"Helvetica Neue",
				"Arial",
				"Noto Sans",
				"sans-serif",
				"Apple Color Emoji",
				"Segoe UI Emoji",
				"Segoe UI Symbol",
				"Noto Color Emoji",
			],
			serif: [
				"ui-serif",
				"Georgia",
				"Cambria",
				"Times New Roman",
				"Times",
				"serif",
			],
			mono: [
				"ui-monospace",
				"SFMono-Regular",
				"Menlo",
				"Monaco",
				"Consolas",
				"Liberation Mono",
				"Courier New",
				"monospace",
			],
			cabin: ["Cabin", "sans-serif"],
		},
		screens: {
			xs: "576px",
			sm: "640px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
			"2xl": "1536px",
		},
		extend: {
			colors: {
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				chart: {
					"1": "hsl(var(--chart-1))",
					"2": "hsl(var(--chart-2))",
					"3": "hsl(var(--chart-3))",
					"4": "hsl(var(--chart-4))",
					"5": "hsl(var(--chart-5))",
				},
			},
			gridTemplateRows: {
				"7": "repeat(7, minmax(0, 1fr))",
				"8": "repeat(8, minmax(0, 1fr))",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
		},
		fontSize: {
			"cabin-title": [
				"24px",
				{
					lineHeight: "normal",
					fontWeight: 400,
				},
			],
			"copy-b": [
				"13px",
				{
					lineHeight: "20px",
					fontWeight: 700,
				},
			],
			copy: [
				"13px",
				{
					lineHeight: "20px",
					fontWeight: 400,
				},
			],
			sub: [
				"11px",
				{
					lineHeight: "14px",
					fontWeight: 400,
				},
			],
			"sub-b": [
				"11px",
				{
					lineHeight: "14px",
					fontWeight: 700,
				},
			],
			title: [
				"28px",
				{
					lineHeight: "42px",
					fontWeight: 600,
				},
			],
			sort: [
				"14px",
				{
					lineHeight: "16px",
					fontWeight: 700,
				},
			],
			h1: [
				"20px",
				{
					lineHeight: "30px",
					fontWeight: 600,
				},
			],
			h2: [
				"18px",
				{
					lineHeight: "27px",
					fontWeight: 600,
				},
			],
			h3: [
				"20px",
				{
					lineHeight: "24px",
					fontWeight: 700,
				},
			],
			h4: [
				"16px",
				{
					lineHeight: "normal",
					fontWeight: 400,
				},
			],
			xs: "0.75rem",
			sm: "0.875rem",
			base: "1rem",
			lg: "1.125rem",
			xl: "1.25rem",
			"2xl": "1.5rem",
			"3xl": "1.875rem",
			"4xl": "2.25rem",
			"5xl": "3rem",
			"6xl": "4rem",
		},
	},
	plugins: [
		({ addUtilities, e, theme, variants }: any) => {
			const colors = flattenColorPalette(theme("borderColor"))
			delete colors["default"]

			const colorMap = Object.keys(colors).map((color) => ({
				[`.border-t-${color}`]: { borderTopColor: colors[color] },
				[`.border-r-${color}`]: { borderRightColor: colors[color] },
				[`.border-b-${color}`]: { borderBottomColor: colors[color] },
				[`.border-l-${color}`]: { borderLeftColor: colors[color] },
			}))
			const utilities = Object.assign({}, ...colorMap)

			addUtilities(utilities, variants("borderColor"))
		},
		// Safelist for dynamically generated classes
		require("tailwind-safelist-generator")({
			path: safeListFile,
			patterns: [
				"text-{colors}",
				"bg-{colors}",
				"dark:bg-{colors}",
				"dark:hover:bg-{colors}",
				"dark:active:bg-{colors}",
				"hover:text-{colors}",
				"hover:bg-{colors}",
				"active:bg-{colors}",
				"ring-{colors}",
				"hover:ring-{colors}",
				"focus:ring-{colors}",
				"focus-within:ring-{colors}",
				"border-{colors}",
				"focus:border-{colors}",
				"focus-within:border-{colors}",
				"dark:text-{colors}",
				"dark:hover:text-{colors}",
				"h-{height}",
				"w-{width}",
				"grid-cols-{grid}",
			],
		}),
		require("tailwindcss-animate"),
	],
}
