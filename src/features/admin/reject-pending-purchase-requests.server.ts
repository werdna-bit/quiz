import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { adminMiddleware } from "@/lib/auth/middleware";
import { db } from "@/lib/db";
import { purchaseRequests } from "@/lib/db/schema";

export const rejectPurchaseRequest = createServerFn({ method: "POST" })
	.middleware([adminMiddleware])
	.inputValidator((data: { id: string }) => data)
	.handler(async ({ data }) => {
		const [updatedRequest] = await db
			.update(purchaseRequests)
			.set({
				status: "rejected",
				resolvedAt: new Date(),
			})
			.where(eq(purchaseRequests.id, data.id))
			.returning();

		return updatedRequest;
	});
