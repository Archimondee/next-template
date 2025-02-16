"use client"

import { withAuth } from "@/components/hoc/withAuth"

function Dashboard() {
	return (
		<div className="flex flex-1 justify-center items-center h-screen">
			<div className="">Protected</div>
		</div>
	)
}

export default withAuth(Dashboard)
