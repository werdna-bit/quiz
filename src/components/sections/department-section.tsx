import { Link } from "@tanstack/react-router";
import {
	ArrowRight,
	Building2Icon,
	CogIcon,
	FlaskConical,
	Zap,
} from "lucide-react";
import type { ReactNode } from "react";

type Subject = {
	slug: string;
	icon: ReactNode;
	name: string;
	description: string;
	questionCount?: number;
};

type DepartmentSectionProps = {
	subjects?: Subject[];
};

const defaultSubjects: Subject[] = [
	{
		slug: "civil",
		icon: <Building2Icon size={18} />,
		name: "Civil Engineering",
		description:
			"Structural analysis, geotechnics, hydraulics, and construction materials — fully worked past paper solutions.",
		questionCount: 100,
	},
	{
		slug: "mechanical",
		icon: <CogIcon size={18} />,
		name: "Mechanical Engineering",
		description:
			"Thermodynamics, fluid mechanics, machine design, and dynamics — step-by-step exam walkthroughs.",
		questionCount: 100,
	},
	{
		slug: "electrical",
		icon: <Zap size={18} />,
		name: "Electrical Engineering",
		description:
			"Circuit theory, power systems, electronics, and signals — clear, detailed solution breakdowns.",
		questionCount: 100,
	},
	{
		slug: "chemical",
		icon: <FlaskConical size={18} />,
		name: "Chemical Engineering",
		description:
			"Mass transfer, reaction engineering, process control, and thermodynamics — exam-ready solutions.",
		questionCount: 100,
	},
];

export const DepartmentSection = ({
	subjects = defaultSubjects,
}: DepartmentSectionProps) => {
	return (
		<section
			id="subjects"
			className="w-full flex flex-col items-center p-4 pb-24 border-b border-zinc-800/60 justify-center gap-10"
		>
			{/* Header */}
			<div className="text-center space-y-3 max-w-xl mx-auto">
				<p className="text-xs font-semibold tracking-widest text-blue-400 uppercase">
					Departments
				</p>
				<h2 className="font-black text-3xl md:text-5xl tracking-tight">
					Browse by Department
				</h2>
				<p className="text-zinc-400 text-sm md:text-base">
					Select your department and start studying with worked solutions.
				</p>
			</div>

			{/* Cards */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 w-full max-w-6xl mx-auto">
				{subjects.map((subject) => (
					<Link
						key={subject.slug}
						to="/subjects/$slug"
						params={{ slug: subject.slug }}
						className="group relative bg-zinc-900/60 flex flex-col gap-5 w-full border border-zinc-800 hover:border-blue-500/50 transition-all duration-300 ease-out rounded-2xl p-6 text-left overflow-hidden"
					>
						{/* hover glow */}
						<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-blue-600/5 to-transparent pointer-events-none rounded-2xl" />

						{/* Icon */}
						<div className="h-10 w-10 flex items-center justify-center text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-xl group-hover:bg-blue-500/20 transition-colors duration-200">
							{subject.icon}
						</div>

						{/* Text */}
						<div className="space-y-2 flex-1">
							<h3 className="font-bold text-white text-sm">{subject.name}</h3>
							<p className="text-zinc-500 text-xs leading-relaxed">
								{subject.description}
							</p>
						</div>

						{/* Footer */}
						<div className="flex items-center justify-between pt-2 border-t border-zinc-800">
							<span className="text-zinc-600 text-xs">
								{subject.questionCount}+ solutions
							</span>
							<span className="text-blue-500 text-xs flex items-center gap-1 group-hover:gap-1.5 transition-all duration-200">
								View
								<ArrowRight size={12} />
							</span>
						</div>
					</Link>
				))}
			</div>
		</section>
	);
};
