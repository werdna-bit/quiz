import { createServerFn } from "@tanstack/react-start";
import { db } from "@/lib/db";
import { subjects } from "@/lib/db/schema";

export const getSubjects = createServerFn().handler(async () => {
	const availableSubjects = await db.select().from(subjects);

	return availableSubjects;
});
