import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { adminMiddleware } from "@/lib/auth/middleware";
import { db } from "@/lib/db";
import { purchaseRequests } from "@/lib/db/schema";

export const getPendingRequests = createServerFn()
	.middleware([adminMiddleware])
	.handler(async () => {
		const requests = await db
			.select()
			.from(purchaseRequests)
			.where(eq(purchaseRequests.status, "pending"));

		return requests;
	});
