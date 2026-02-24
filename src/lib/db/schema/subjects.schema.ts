import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const subjects = pgTable("subjects", {
	id: uuid("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text("name").notNull(),
	slug: text("slug").unique().notNull(),
	description: text("description"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});
