import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { getNavigationData } from "@/features/navigation/get-navigation.function";
import { NavigationTree } from "./navigation-tree";

type Quiz = {
	id: string;
	title: string;
};

type Module = {
	id: string;
	name: string;
	quizzes: Quiz[];
};

type Year = {
	year: number;
	modules: Module[];
};

type Course = {
	id: string;
	name: string;
	years: Year[];
};

export default function SideBarNavigation({ nav }: { nav: Course[] }) {
	const navigate = useNavigate();

	if (!nav) return null;

	const handleQuizSelect = (quizId: string) => {
		navigate({ to: "/quizzes/$quizId", params: { quizId } });
	};

	return (
		<aside className="h-full w-[45%] max-w-[400px] p-4">
			<NavigationTree data={nav} onQuizSelect={handleQuizSelect} />
		</aside>
	);
}
