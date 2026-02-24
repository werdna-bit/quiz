import { createServerFn } from "@tanstack/react-start";
import { and, eq } from "drizzle-orm";
import { authMiddleware } from "@/lib/auth/middleware";
import { db } from "@/lib/db";
import { purchaseRequests } from "@/lib/db/schema";

export const createPurchaseRequest = createServerFn({ method: "POST" })
	.middleware([authMiddleware])
	.inputValidator((data: { id: string; fingerprint: string }) => data)
	.handler(async ({ context, data }) => {
		const user = context.user;

		const exists = await db
			.select()
			.from(purchaseRequests)
			.where(
				and(
					eq(purchaseRequests.userId, user.id),
					eq(purchaseRequests.quizId, data.id),
				),
			);

		if (!exists.length) {
			await db.insert(purchaseRequests).values({
				userId: user.id,
				quizId: data.id,
				deviceFingerprint: data.fingerprint,
			});
		}

		return { success: true };
	});
