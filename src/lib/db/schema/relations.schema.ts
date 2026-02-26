import { relations } from "drizzle-orm";
import { account, session, user } from "./auth.schema";
import { courseModules } from "./courseModules.schema";
import { courses } from "./courses.schema";
import { modules } from "./modules.schema";
import { purchaseRequests } from "./purchaseRequests.schema";
import { questionOptions } from "./questionOptions.schema";
import { questions } from "./questions.schema";
import { quizzes } from "./quizzes.schema";
import { solutions } from "./solutions.schema";
import { solutionVariables } from "./solutionVariables.schema";

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
export const coursesRelations = relations(courses, ({ many }) => ({
	courseModules: many(courseModules),
}));

export const modulesRelations = relations(modules, ({ many }) => ({
	courseModules: many(courseModules),
	quizzes: many(quizzes),
}));

export const courseModulesRelations = relations(courseModules, ({ one }) => ({
	course: one(courses, {
		fields: [courseModules.courseId],
		references: [courses.id],
	}),
	module: one(modules, {
		fields: [courseModules.moduleId],
		references: [modules.id],
	}),
}));

export const quizzesRelations = relations(quizzes, ({ one, many }) => ({
	module: one(modules, {
		fields: [quizzes.moduleId],
		references: [modules.id],
	}),
	questions: many(questions),
	purchaseRequests: many(purchaseRequests),
}));

export const questionsRelations = relations(questions, ({ one, many }) => ({
	quiz: one(quizzes, {
		fields: [questions.quizId],
		references: [quizzes.id],
	}),
	solution: one(solutions),
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

export const solutionsRelations = relations(solutions, ({ one, many }) => ({
	question: one(questions, {
		fields: [solutions.questionId],
		references: [questions.id],
	}),
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
		quiz: one(quizzes, {
			fields: [purchaseRequests.quizId],
			references: [quizzes.id],
		}),
	}),
);
