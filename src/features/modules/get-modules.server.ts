import { createServerFn } from "@tanstack/react-start";
import { asc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { courseModules, courses, modules } from "@/lib/db/schema";

export const getModules = createServerFn().handler(async () => {
	const availableModules = await db.select().from(modules);

	return availableModules;
});

export const getCourses = createServerFn().handler(async () => {
	return await db.select().from(courses);
});

export const getModulesByCourse = createServerFn({ method: "GET" })
	.inputValidator((data: { slug: string }) => data)
	.handler(async ({ data }) => {
		const [course] = await db
			.select()
			.from(courses)
			.where(eq(courses.slug, data.slug));
		if (!course) throw new Error("Course not found");

		const result = await db
			.select({ module: modules })
			.from(courseModules)
			.innerJoin(modules, eq(courseModules.moduleId, modules.id))
			.where(eq(courseModules.courseId, course.id))
			.orderBy(asc(modules.year), asc(modules.name));

		return result.map((r) => r.module);
	});
