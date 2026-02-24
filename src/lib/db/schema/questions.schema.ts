import {
	integer,
	pgEnum,
	pgTable,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";
import { quizzes } from "./quizzes.schema";

export const questionType = pgEnum("question_type", [
	"parameterized",
	"multiple-choice",
]);

export const questions = pgTable("questions", {
	id: uuid("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	quizId: uuid("quiz_id")
		.notNull()
		.references(() => quizzes.id, { onDelete: "cascade" }),
	body: text("body").notNull(),
	orderIndex: integer("order_index").notNull(),
	type: questionType().notNull(),
	image: text("image"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});
