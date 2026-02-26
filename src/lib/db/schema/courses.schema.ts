import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const courses = pgTable("courses", {
	id: uuid("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text("name").notNull(),
	slug: text("slug").notNull(),
	description: text("description"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});
