import { File, GraduationCap } from "lucide-react";
import type { ReactNode } from "react";

export const HowItWorks = () => {
	const steps: { name: string; description: string; icon: ReactNode }[] = [
		{
			name: "Choose a quiz",
			description: "Browse any quiz of your choice, past and present.",
			icon: <File />,
		},
		{
			name: "Unlock the solution",
			description:
				"Subscribe or purchase individual solutions to access full worked answers.",
			icon: <File />,
		},
		{
			name: "Study & Excel",
			description:
				"Follow the step-by-step breakdown and submit your quiz with confidence.",
			icon: <GraduationCap />,
		},
	];
	return (
		<section className="w-full text-center flex flex-col items-center py-20 p-4 border-b-1 justify-center gap-10">
			<div className="space-y-4">
				<h2 className="font-[700] text-2xl text-4xl">How It Works</h2>
				<p className="text-gray-500">
					Three simple steps for better quiz marks
				</p>
			</div>
			<div className="flex flex-col md:flex-row items-center max-w-5xl mx-auto gap-8 md:gap-4">
				{steps.map((step, index) => (
					<div
						key={step.name}
						className="text-center md:flex-1 flex flex-col items-center gap-3"
					>
						<div className="w-12 h-12 text-blue-500 rounded-lg bg-card flex items-center justify-center p-3">
							{step.icon}
						</div>
						<p className="text-xs text-gray-500 font-[600]">
							STEP {index + 1}{" "}
						</p>
						<h3 className="text-xl font-[700]">{step.name}</h3>
						<p className="text-zinc-500 text-sm font-[500] w-[60%]">
							{step.description}
						</p>
					</div>
				))}
			</div>
		</section>
	);
};
