"use client"

export const useAuth = () => {
	const getAccessToken = (): string | null => {
		if (typeof window !== "undefined") {
			return localStorage.getItem("isLoggedIn")
		}
		return null
	}

	return {
		getAccessToken,
	}
}
