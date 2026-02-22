import "@tanstack/react-start/server-only";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, phoneNumber, username } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";

import { env } from "@/env/server";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";

export const auth = betterAuth({
	baseURL: env.VITE_BASE_URL,
	telemetry: {
		enabled: false,
	},
	database: drizzleAdapter(db, {
		provider: "pg",
		schema,
	}),
	emailAndPassword: {
		enabled: true,
	},

	// https://www.better-auth.com/docs/integrations/tanstack#usage-tips
	plugins: [admin(), phoneNumber(), tanstackStartCookies()],

	// https://www.better-auth.com/docs/concepts/session-management#session-caching
	session: {
		cookieCache: {
			enabled: true,
			maxAge: 5 * 60, // 5 minutes
		},
	},
	experimental: {
		// https://www.better-auth.com/docs/adapters/drizzle#joins-experimental
		joins: true,
	},
});
