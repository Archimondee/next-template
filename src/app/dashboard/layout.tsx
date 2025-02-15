export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div>
			<div className={"antialiased"}>{children}</div>
		</div>
	)
}
