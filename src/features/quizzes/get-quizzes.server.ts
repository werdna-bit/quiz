import { createServerFn } from "@tanstack/react-start";
import { setResponseStatus } from "@tanstack/react-start/server";
import { and, eq } from "drizzle-orm";
import { authMiddleware } from "@/lib/auth/middleware";
import { db } from "@/lib/db";
import { purchaseRequests, quizzes, subjects } from "@/lib/db/schema";

export const getQuizzesBySubject = createServerFn({ method: "GET" })
	.inputValidator((data: { slug: string }) => data)
	.handler(async ({ data }) => {
		const [subject] = await db
			.select()
			.from(subjects)
			.where(eq(subjects.slug, data.slug));

		if (!subject) {
			throw new Error("Subject matching not slug found");
		}

		const subjectQuizzes = await db
			.select()
			.from(quizzes)
			.where(eq(quizzes.subjectId, subject.id));

		return subjectQuizzes;
	});

export const getQuiz = createServerFn({ method: "GET" })
	.inputValidator((data: { id: string }) => data)
	.handler(async ({ data }) => {
		const [quiz] = await db
			.select()
			.from(quizzes)
			.where(eq(quizzes.id, data.id));

		return quiz;
	});

export const getQuizUnlocked = createServerFn({ method: "GET" })
	.middleware([authMiddleware])
	.inputValidator((data: { id: string }) => data)
	.handler(async ({ context, data }) => {
		const user = context.user;

		const [purchase] = await db
			.select()
			.from(purchaseRequests)
			.where(
				and(
					eq(purchaseRequests.quizId, data.id),
					eq(purchaseRequests.userId, user.id),
					eq(purchaseRequests.status, "approved"),
				),
			)
			.limit(1);

		if (!purchase) {
			setResponseStatus(402);
			throw new Error("Payment required to view quiz");
		}

		const quiz = await db.query.quizzes.findFirst({
			where: eq(quizzes.id, data.id),
			with: {
				questions: {
					orderBy: (questions, { asc }) => [asc(questions.orderIndex)],
					with: {
						options: {
							orderBy: (options, { asc }) => [asc(options.orderIndex)],
						},
						solution: {
							with: {
								variables: true,
							},
						},
					},
				},
			},
		});

		if (!quiz) {
			setResponseStatus(404);
			throw new Error("Quiz not found");
		}

		return quiz;
	});
