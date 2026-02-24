import { relations } from "drizzle-orm";
import { account, session, user } from "./auth.schema";
import { purchaseRequests } from "./purchaseRequests.schema";
import { questionOptions } from "./questionOptions.schema";
import { questions } from "./questions.schema";
import { quizzes } from "./quizzes.schema";
import { solutions } from "./solutions.schema";
import { solutionVariables } from "./solutionVariables.schema";
import { subjects } from "./subjects.schema";

export const userRelations = relations(user, ({ many }) => ({
	sessions: many(session),
	accounts: many(account),
	purchases: many(purchaseRequests),
}));

export const sessionRelations = relations(session, ({ one }) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id],
	}),
}));

export const accountRelations = relations(account, ({ one }) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id],
	}),
}));

export const subjectRelations = relations(subjects, ({ many }) => ({
	quizzes: many(quizzes),
}));

export const quizRelations = relations(quizzes, ({ many }) => ({
	questions: many(questions),
	purchases: many(purchaseRequests),
}));

export const questionRelations = relations(questions, ({ one, many }) => ({
	quiz: one(quizzes, {
		fields: [questions.quizId],
		references: [quizzes.id],
	}),
	solution: one(solutions, {
		fields: [questions.id],
		references: [solutions.questionId],
	}),
	options: many(questionOptions),
}));

export const questionOptionsRelations = relations(
	questionOptions,
	({ one }) => ({
		question: one(questions, {
			fields: [questionOptions.questionId],
			references: [questions.id],
		}),
	}),
);

export const solutionRelations = relations(solutions, ({ many }) => ({
	variables: many(solutionVariables),
}));

export const solutionVariablesRelations = relations(
	solutionVariables,
	({ one }) => ({
		solution: one(solutions, {
			fields: [solutionVariables.solutionId],
			references: [solutions.id],
		}),
	}),
);

export const purchaseRequestsRelations = relations(
	purchaseRequests,
	({ one }) => ({
		user: one(user, {
			fields: [purchaseRequests.userId],
			references: [user.id],
		}),
		quiz: one(quizzes, {
			fields: [purchaseRequests.quizId],
			references: [quizzes.id],
		}),
	}),
);
