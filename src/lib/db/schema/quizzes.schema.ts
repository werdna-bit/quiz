import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { subjects } from "./subjects.schema";

export const quizzes = pgTable("quizzes", {
	id: uuid("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	subjectId: uuid("subject_id")
		.notNull()
		.references(() => subjects.id, { onDelete: "cascade" }),
	title: text("title").notNull(),
	description: text("description"),
	image: text("image"),
	isPublished: boolean("is_published").default(false).notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});
