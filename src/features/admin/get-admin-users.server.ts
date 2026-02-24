import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { adminMiddleware } from "@/lib/auth/middleware";
import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";

export const getAdminUsers = createServerFn({ method: "GET" })
	.middleware([adminMiddleware])
	.handler(async () => {
		const adminUsers = await db.select().from(user);

		return adminUsers;
	});
