"use client"
import { useTodosDetails } from "@/hooks/useTodos"
import Link from "next/link"

function TodoDetails({ id }: { id: number }) {
	const { data: todo, isLoading, isError } = useTodosDetails(id)

	if (isLoading) return <div>Loading...</div>
	if (isError)
		return <div className="p-8 text-red-600">Error: Todo not found</div>
	if (!todo) return <div>Todo not found</div>

	return (
		<div className="p-8">
			<Link
				href="/todos"
				className="text-blue-500 hover:text-blue-700 mb-6 inline-block"
			>
				← Back to Todos
			</Link>
			<div className="bg-white p-6 rounded-lg shadow-lg">
				<h1 className="text-3xl font-bold mb-4">{todo.title}</h1>
				<div className="space-y-4">
					<div className="flex items-center space-x-2">
						<span className="font-semibold">Status:</span>
						<span
							className={`px-3 py-1 rounded-full text-sm ${
								todo.completed
									? "bg-green-100 text-green-800"
									: "bg-yellow-100 text-yellow-800"
							}`}
						>
							{todo.completed ? "Completed" : "Pending"}
						</span>
					</div>
					<div>
						<span className="font-semibold">User ID:</span> {todo.userId}
					</div>
					<div>
						<span className="font-semibold">Todo ID:</span> {todo.id}
					</div>
				</div>
			</div>
		</div>
	)
}

export default TodoDetails
