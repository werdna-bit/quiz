import { createFileRoute } from "@tanstack/react-router";
import { getQuizByID } from "@/features/quizzes/get-quiz-by-id.function";

export const Route = createFileRoute("/quizzes/$quizId")({
	component: RouteComponent,
	loader: async ({ params }) => {
		return getQuizByID({ data: { id: params.quizId } });
	},
});

function RouteComponent() {
	const quiz = Route.useLoaderData();
	return (
		<section className="h-full bg-red-500 w-full">
			<pre className="max-w-screen overflow-x-auto px-2 text-start">
				{JSON.stringify(quiz, null, 2)}
			</pre>
		</section>
	);
}
