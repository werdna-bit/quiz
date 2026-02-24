import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "./auth.schema";
import { quizzes } from "./quizzes.schema";

export const purchaseStatus = pgEnum("purchase_status", [
	"pending",
	"approved",
	"rejected",
	"expired",
]);

export const purchaseRequests = pgTable("purchase_requests", {
	id: uuid("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	quizId: uuid("quiz_id")
		.notNull()
		.references(() => quizzes.id, { onDelete: "cascade" }),
	status: purchaseStatus().default("pending").notNull(),
	deviceFingerprint: text("device_fingerprint").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	resolvedAt: timestamp("resolved_at"),
});
