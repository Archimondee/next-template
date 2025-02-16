"use client"

import { withAuth } from "@/components/hoc/withAuth"

function Profile() {
	return (
		<div className="flex flex-1 justify-center items-center h-screen">
			<div className="">Protected Profile</div>
		</div>
	)
}

export default withAuth(Profile)
