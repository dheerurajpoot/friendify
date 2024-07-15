import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname;
	const isPublicPath =
		path === "/login" || path === "/sign-up" || path === "/verifyemail";

	const token = request.cookies.get("token")?.value || "";

	if (isPublicPath && token) {
		return NextResponse.redirect(new URL("/", request.url));
	}
	if (!isPublicPath && !token) {
		return NextResponse.redirect(new URL("/login", request.url));
	}
	return NextResponse.next();
}
export const config = {
	matcher: [
		"/",
		"/login",
		"/sign-up",
		"/profile",
		"/search",
		"/friends",
		"/verifyemail",
		"/updateprofile",
		"/chat",
		"/message",
		"/notification",
	],
};
