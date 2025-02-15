import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
	return (
		<div className="flex flex-1 justify-center items-center h-screen">
			<div className="">
				<div className="mb-3 text-center">Please click one of these</div>
				<div className="flex flex-row justify-center gap-3">
					<Link href={"/todos"}>
						<Button>Go to todos</Button>
					</Link>
					<Link href={"/login"}>
						<Button>Login</Button>
					</Link>
				</div>
			</div>
		</div>
	)
}
