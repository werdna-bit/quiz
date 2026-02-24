import { boolean, integer, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { questions } from "./questions.schema";

export const questionOptions = pgTable("question_options", {
	id: uuid("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	questionId: uuid("question_id")
		.notNull()
		.references(() => questions.id, { onDelete: "cascade" }),
	body: text("body").notNull(),
	isCorrect: boolean("is_correct").notNull(),
	orderIndex: integer("order_index").notNull(),
});
