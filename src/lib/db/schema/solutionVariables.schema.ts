import { integer, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { solutions } from "./solutions.schema";

export const solutionVariables = pgTable("solution_variables", {
	id: uuid("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	solutionId: uuid("solution_id")
		.notNull()
		.references(() => solutions.id, { onDelete: "cascade" }),
	name: text("name").notNull(),
	label: text("label").notNull(),
	unit: text("unit"),
	defaultValue: text("default_value"),
	orderIndex: integer("order_index").notNull(),
});
