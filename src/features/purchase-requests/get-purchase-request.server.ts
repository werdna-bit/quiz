import { createServerFn } from "@tanstack/react-start";
import { and, eq } from "drizzle-orm";
import { authMiddleware } from "@/lib/auth/middleware";
import { db } from "@/lib/db";
import { purchaseRequests } from "@/lib/db/schema";

export const getPurchaseRequest = createServerFn({ method: "GET" })
	.middleware([authMiddleware])
	.inputValidator((data: { id: string }) => data)
	.handler(async ({ context, data }) => {
		const user = context.user;

		const [result] = await db
			.select()
			.from(purchaseRequests)
			.where(
				and(
					eq(purchaseRequests.quizId, data.id),
					eq(purchaseRequests.userId, user.id),
				),
			);

		return result;
	});
