import { QueryProvider } from "@/config/providers/query-client"
import "@radix-ui/themes/styles.css"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
})

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
})

export const metadata: Metadata = {
	title: "Todos List | Todos App",
	description:
		"Browse and manage your todos. A comprehensive list of all your tasks and their current status.",
	openGraph: {
		title: "Todos List | Todos App",
		description:
			"Browse and manage your todos. A comprehensive list of all your tasks and their current status.",
		type: "website",
	},
	twitter: {
		card: "summary",
		title: "Todos List | Todos App",
		description:
			"Browse and manage your todos. A comprehensive list of all your tasks and their current status.",
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<QueryProvider>{children}</QueryProvider>
			</body>
		</html>
	)
}
