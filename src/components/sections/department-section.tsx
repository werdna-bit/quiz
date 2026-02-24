import { Link } from "@tanstack/react-router";
import {
	ArrowRight,
	Building2Icon,
	CogIcon,
	FlaskConical,
	Home,
	Zap,
} from "lucide-react";
import type { ReactNode } from "react";

type Department = {
	id: string;
	icon: ReactNode;
	name: string;
	description: string;
};

export const DepartmentSection = () => {
	const departments: Department[] = [
		{
			id: "a6bda5a7-e927-4cce-93dc-d99dadda129c",
			icon: <Building2Icon />,
			name: "Civil Engineering",
			description:
				"Structural analysis, geotechnics, hydraulics, and construction materials — fully worked past paper solutions.",
		},

		{
			id: "ceea4cec-c85a-4c09-97d1-ecceb3e365a6",
			icon: <CogIcon />,
			name: "Mechanical Engineering",
			description:
				"Thermodynamics, fluid mechanics, machine design, and dynamics — step-by-step exam walkthroughs.",
		},
		{
			id: "c11461d8-8171-4b15-821b-b4e9e3410a8f",
			icon: <Zap />,
			name: "Electrical Engineering",
			description:
				"Circuit theory, power systems, electronics, and signals — clear, detailed solution breakdowns.",
		},

		{
			id: "c11461d8-9600-4b15-821b-b4e9e3410a8f",
			icon: <FlaskConical />,
			name: "Chemical Engineering",
			description:
				"Mass transfer, reaction engineering, process control, and thermodynamics — exam-ready solutions.",
		},
	];
	return (
		<section className="w-full text-center flex flex-col items-center p-4 pb-20 border-b-1 justify-center gap-4 md:gap-6">
			<h2 className="font-[700] text-2xl md:text-4xl">Browse by Department</h2>
			<p className="text-gray-500">
				Select your department and start studying with worked solutions.
			</p>
			<div className="grid gap-6 md:gap-4 md:grid-cols-4 w-full max-w-6xl mx-auto">
				{departments.map((department) => (
					<div
						key={department.id}
						className="bg-card group flex flex-col gap-4 w-full border cursor-pointer border-zinc-800 hover:border-blue-700 transition-all duration-200 ease-in-out rounded-xl p-6 md:p-8 text-left"
					>
						<div className="h-9 w-9 flex items-center justify-center p-2 text-blue-400 bg-blue-900/20 rounded-md">
							{department.icon}
						</div>
						<h3 className="font-[600]">{department.name}</h3>
						<p className="text-gray-400 text-sm">{department.description}</p>
						<p className="text-gray-400 text-xs">100+ solved questions</p>

						<Link
							to="/"
							className="text-blue-500 text-sm flex items-center group-hover:text-blue-700"
						>
							<p>View Solutions</p>
							<ArrowRight
								width={15}
								className="ml-0.5 group-hover:ml-1 transition-all duration-200 ease-in-out"
							/>
						</Link>
					</div>
				))}
			</div>
		</section>
	);
};
