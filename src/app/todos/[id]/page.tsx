import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";
import { TodoDetails } from "./todo-details";
import { apiGet } from "@/config/api/axios";
import { Todo } from "@/types/TodoTypes";
import { Metadata } from "next";

export default async function TodoPage(props: {
	params: Promise<{ id: number }>;
}) {
	const params = await props.params;
	const queryClient = new QueryClient();

	const id = params.id;

	await queryClient.prefetchQuery({
		queryKey: ["todos", id],
		queryFn: async () => {
			const data = await apiGet(`/todos/${id}`);
			return data;
		},
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<TodoDetails id={id} />
		</HydrationBoundary>
	);
}

export async function generateMetadata(props: {
	params: Promise<{ id: number }>; // Keep as Promise
}): Promise<Metadata> {
	try {
		const { id } = await props.params;
		const fetching = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/todos/${id}`
		);
		const todo = (await fetching.json()) as Todo;
		const title = `${todo.title} | Todo Details`;
		const description = `View details of todo: ${todo?.title}. Status: ${
			todo?.completed ? "Completed" : "Pending"
		}`;

		return {
			title,
			description,
			openGraph: {
				title,
				description,
				type: "article",
				url: `/todos/${id}`,
				images: [
					{
						url: "/og-default.jpg", // Add default image
						width: 1200,
						height: 630,
					},
				],
			},
			twitter: {
				card: "summary_large_image",
				title,
				description,
				images: ["/twitter-og.jpg"],
			},
		};
	} catch (error) {
		console.log("dataa", error);
		return {
			title: "Todo Not Found",
			description: "The requested todo could not be found.",
		};
	}
}
