import {
	integer,
	jsonb,
	pgTable,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";
import type { SolutionSteps } from "@/types";
import { questions } from "./questions.schema";

export const solutions = pgTable("solutions", {
	id: uuid("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	questionId: uuid("question_id")
		.notNull()
		.unique()
		.references(() => questions.id, { onDelete: "cascade" }),
	steps: jsonb("solutions_steps").$type<SolutionSteps>(),
	previewSteps: integer("preview_steps").default(2).notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
});
