import { apiGet } from "@/config/api/axios"
import { Todo } from "@/types/TodoTypes"
import { QueryObserverOptions, useQuery } from "@tanstack/react-query"

export function useTodos(options?: QueryObserverOptions<Todo[]>) {
	return useQuery<Todo[], Error, Todo[]>({
		queryKey: ["todos"],
		queryFn: async () => {
			const response = await apiGet<Todo[]>("/todos")
			return response
		},
		...options,
	})
}

export function useTodosDetails(
	id: number,
	options?: QueryObserverOptions<Todo>,
) {
	return useQuery<Todo, Error, Todo>({
		queryKey: ["todos", id],
		queryFn: async () => {
			const response = await apiGet<Todo>(`/todos/${id}`)
			return response
		},
		...options,
	})
}
