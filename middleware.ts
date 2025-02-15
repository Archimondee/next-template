import { NextRequest, NextResponse } from "next/server"

export function middleware(_: NextRequest) {
	// const token = request.cookies.get("token")?.value
	// if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
	// 	return NextResponse.redirect(new URL("/login", request.url))
	// }
	return NextResponse.next()
}
