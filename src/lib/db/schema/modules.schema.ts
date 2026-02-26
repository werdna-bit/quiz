import { integer, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";

export enum Year {
	One = 1,
	Two = 2,
	Three = 3,
	Four = 4,
}

export const modules = pgTable("modules", {
	id: uuid("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text("name").notNull(),
	slug: text("slug").notNull(),
	year: integer("year").$type<Year>().notNull(),
});
