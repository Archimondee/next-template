"use client"

import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { type ComponentType, useEffect, useState } from "react"

export function withAuth<P extends object>(WrappedComponent: ComponentType<P>) {
	return function WithAuthComponent(props: P) {
		const { getAccessToken } = useAuth()
		const router = useRouter()
		const [isLoading, setIsLoading] = useState(true)

		useEffect(() => {
			if (!getAccessToken()) {
				router.replace("/login")
			} else {
				setIsLoading(false)
			}
		}, [getAccessToken, router])

		if (isLoading) {
			return null
		}

		return <WrappedComponent {...props} />
	}
}
