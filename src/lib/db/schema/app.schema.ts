import { randomUUID } from "crypto";
import {
	boolean,
	integer,
	pgEnum,
	pgTable,
	text,
	timestamp,
} from "drizzle-orm/pg-core";

export const subjects = pgTable("subjects", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => randomUUID()),
	name: text("name").notNull(),
	slug: text("slug").notNull().unique(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const quizzes = pgTable("quizzes", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => randomUUID()),
	subjectId: text("subject_id")
		.notNull()
		.references(() => subjects.id, { onDelete: "cascade" }),
	title: text("title").notNull(),
	description: text("description"),
	price: integer("price").notNull(), // in cents
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const solutions = pgTable("solutions", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => randomUUID()),
	quizId: text("quiz_id")
		.notNull()
		.references(() => quizzes.id, { onDelete: "cascade" }),
	steps: text("steps").notNull(),
	previewSteps: integer("preview_steps").default(2),
});

export const accessCodes = pgTable("access_codes", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => randomUUID()),
	code: text("code").notNull().unique(),
	quizId: text("quiz_id")
		.notNull()
		.references(() => quizzes.id),
	deviceFingerprint: text("device_fingerprint").notNull(),
	expiresAt: timestamp("expires_at").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});
