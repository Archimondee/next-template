"use client"

import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { ComponentType, useEffect } from "react"

export function withAuth<P extends object>(WrappedComponent: ComponentType<P>) {
	return function WithAuthComponent(props: P) {
		const { getAccessToken } = useAuth()
		const router = useRouter()

		useEffect(() => {
			if (!getAccessToken()) {
				router.replace("/login")
			}
		}, [getAccessToken, router])

		if (!getAccessToken()) {
			return null
		}

		return <WrappedComponent {...props} />
	}
}
