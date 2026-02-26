import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { courses } from "@/lib/db/schema";

export const getCourseBySlug = createServerFn({ method: "GET" })
	.inputValidator((data: { slug: string }) => data)
	.handler(async ({ data }) => {
		const [course] = await db
			.select()
			.from(courses)
			.where(eq(courses.slug, data.slug));
		if (!course) throw new Error("Course not found");

		return course;
	});
