import { createMiddleware } from "@tanstack/react-start";
import {
	getRequest,
	getResponseHeaders,
	setResponseHeaders,
	setResponseStatus,
} from "@tanstack/react-start/server";
import { auth } from "@/lib/auth/auth";

async function getAuthenticatedUser() {
	const session = await auth.api.getSession({
		headers: getRequest().headers,
		query: { disableCookieCache: true },
		returnHeaders: true,
	});

	// Append each Set-Cookie header individually (RFC 6265 — must not be comma-joined)
	const cookies = session.headers?.getSetCookie();
	if (cookies?.length) {
		const responseHeaders = getResponseHeaders();
		for (const cookie of cookies) {
			responseHeaders.append("Set-Cookie", cookie);
		}
		setResponseHeaders(responseHeaders);
	}

	if (!session?.response?.user) {
		setResponseStatus(401);
		throw new Error("Unauthorized");
	}

	return session.response.user;
}

/**
 * Requires a valid session. Adds `user` to server context.
 */
export const authMiddleware = createMiddleware().server(async ({ next }) => {
	const user = await getAuthenticatedUser();
	return next({ context: { user } });
});

/**
 * Requires a valid session AND admin role. Adds `user` to server context.
 */
export const adminMiddleware = createMiddleware().server(async ({ next }) => {
	const user = await getAuthenticatedUser();

	if (user.role !== "admin") {
		setResponseStatus(403);
		throw new Error("Forbidden");
	}

	return next({ context: { user } });
});
