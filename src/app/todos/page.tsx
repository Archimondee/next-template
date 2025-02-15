import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query"

import { apiGet } from "@/config/api/axios"
import { Todo } from "@/types/TodoTypes"
import { Todos } from "./todos"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Todos List | Next.js Template",
	description:
		"Browse and manage your todos. A comprehensive list of all your tasks and their current status.",
	openGraph: {
		title: "Todos List | Next.js Template",
		description:
			"Browse and manage your todos. A comprehensive list of all your tasks and their current status.",
		type: "website",
	},
	twitter: {
		card: "summary",
		title: "Todos List | Next.js Template",
		description:
			"Browse and manage your todos. A comprehensive list of all your tasks and their current status.",
	},
}

export default async function TodosPage() {
	const queryClient = new QueryClient()

	await queryClient.prefetchQuery({
		queryKey: ["todos"],
		queryFn: async () => {
			const data = await apiGet<Todo[]>("/todos")
			return data
		},
	})

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Todos />
		</HydrationBoundary>
	)
}
