import { apiGet } from "@/config/api/axios"
import type { Todo } from "@/types/TodoTypes"
import Todos from "./todos"

import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from "@tanstack/react-query"

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
