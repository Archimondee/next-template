import { Metadata } from "next"
import Login from "./login"

export default async function LoginPage() {
	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<Login />
			</div>
		</div>
	)
}

export const metadata: Metadata = {
	title: "Login Page | Todo App",
	description: "Login to view the dashboard",
}
