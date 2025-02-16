"use client"

import { useTodos } from "@/hooks/useTodos"
import Link from "next/link"

function Todos() {
	const { data: todos, isLoading, error } = useTodos()

	if (isLoading) return
	;<div>Loading...</div>
	if (error) return <div>Error: {error.message}</div>

	return (
		<div className="p-8">
			<h1 className="text-2xl font-bold mb-6">Todos </h1>
			<div className="space-y-4">
				{todos?.map((todo) => (
					<Link key={todo.id} href={`/todos/${todo.id}`} className="block">
						<div className="p-4 border border-gray-200 rounded-lg shadow-sm flex items-center justify-between hover:bg-gray-50 transition-colors">
							<h2 className="text-xl font-semibold">{todo.title}</h2>
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
					</Link>
				))}
			</div>
		</div>
	)
}

export default Todos
