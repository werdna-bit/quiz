import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { questions, quizzes } from "@/lib/db/schema";

export const getQuizByID = createServerFn({ method: "GET" })
	.inputValidator((data: { id: string }) => data)
	.handler(async ({ data }) => {
		const quiz = await db.query.quizzes.findFirst({
			where: eq(quizzes.id, data.id),
			with: {
				questions: {
					orderBy: (questions, { asc }) => [asc(questions.orderIndex)],
					columns: {
						id: true,
						body: true,
						orderIndex: true,
						type: true,
					},
				},
			},
		});
		if (!quiz) throw new Error("Quiz not found");
		return quiz;
	});
