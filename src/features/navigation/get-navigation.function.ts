import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { quizzes } from "@/lib/db/schema";

export const getNavigationData = createServerFn({ method: "GET" }).handler(
	async () => {
		const result = await db.query.courses.findMany({
			columns: { id: true, name: true },
			with: {
				courseModules: {
					with: {
						module: {
							columns: { id: true, name: true, year: true },
							with: {
								quizzes: {
									where: eq(quizzes.isPublished, true),
									columns: { id: true, title: true },
								},
							},
						},
					},
				},
			},
			orderBy: (courses, { asc }) => [asc(courses.name)],
		});

		return result.map((course) => {
			// Group modules by year
			const modulesByYear = course.courseModules.reduce(
				(acc, cm) => {
					const year = cm.module.year;
					if (!acc[year]) {
						acc[year] = [];
					}
					acc[year].push({
						id: cm.module.id,
						name: cm.module.name,
						quizzes: cm.module.quizzes.map((q) => ({
							id: q.id,
							title: q.title,
						})),
					});
					return acc;
				},
				{} as Record<
					number,
					Array<{
						id: string;
						name: string;
						quizzes: Array<{ id: string; title: string }>;
					}>
				>,
			);

			// Convert to array format
			const years = Object.entries(modulesByYear)
				.map(([year, modules]) => ({
					year: Number(year),
					modules,
				}))
				.sort((a, b) => a.year - b.year);

			return {
				id: course.id,
				name: course.name,
				years,
			};
		});
	},
);
