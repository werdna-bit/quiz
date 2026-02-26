import { pgTable, unique, uuid } from "drizzle-orm/pg-core";
import { courses } from "./courses.schema";
import { modules } from "./modules.schema";

export const courseModules = pgTable(
	"course_modules",
	{
		id: uuid()
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID()),
		courseId: uuid("course_id")
			.notNull()
			.references(() => courses.id, { onDelete: "cascade" }),
		moduleId: uuid("module_id")
			.notNull()
			.references(() => modules.id, { onDelete: "cascade" }),
	},
	(t) => [unique().on(t.courseId, t.moduleId)],
);
