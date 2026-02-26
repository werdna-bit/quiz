import { createFileRoute, Outlet } from "@tanstack/react-router";
import SideBarNavigation from "@/components/sidebar-navigation";
import { getNavigationData } from "@/features/navigation/get-navigation.function";

export const Route = createFileRoute("/quizzes")({
	component: RouteComponent,
	loader: async () => {
		return getNavigationData();
	},
});

function RouteComponent() {
	const navData = Route.useLoaderData();

	return (
		<div className="flex h-svh overflow-hidden max-w-7xl mx-auto">
			<SideBarNavigation nav={navData} />
			<main className="flex-1 overflow-y-auto p-4">
				<Outlet />
			</main>
		</div>
	);
}
