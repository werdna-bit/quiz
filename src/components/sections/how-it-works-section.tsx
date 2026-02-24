import { BookOpen, KeyRound, Trophy } from "lucide-react";
import type { ReactNode } from "react";

type Step = {
	name: string;
	description: string;
	icon: ReactNode;
};

const steps: Step[] = [
	{
		name: "Choose a Quiz",
		description:
			"Browse past exam papers across your department. Find the quiz that matches your assignment.",
		icon: <BookOpen size={20} />,
	},
	{
		name: "Unlock the Solution",
		description:
			"Purchase the quiz for N$14 and get instant access to the full worked solution once approved.",
		icon: <KeyRound size={20} />,
	},
	{
		name: "Study & Excel",
		description:
			"Enter your specific values, follow the step-by-step breakdown, and submit with confidence.",
		icon: <Trophy size={20} />,
	},
];

export const HowItWorks = () => {
	return (
		<section className="relative w-full flex flex-col items-center p-4 py-24 border-b border-zinc-800/60 justify-center gap-12 overflow-hidden">
			{/* Background accent */}
			<div
				className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]"
				aria-hidden="true"
				style={{
					backgroundImage:
						"radial-gradient(circle at 20% 50%, #3b82f6 0%, transparent 60%), radial-gradient(circle at 80% 50%, #3b82f6 0%, transparent 60%)",
				}}
			/>

			{/* Header */}
			<div className="text-center space-y-3 max-w-xl mx-auto">
				<p className="text-xs font-semibold tracking-widest text-blue-400 uppercase">
					How It Works
				</p>
				<h2 className="font-black text-3xl md:text-5xl tracking-tight">
					Three Simple Steps
				</h2>
				<p className="text-zinc-400 text-sm md:text-base">
					From browsing to submitting — in minutes.
				</p>
			</div>

			{/* Steps */}
			<div className="relative flex flex-col md:flex-row items-start md:items-stretch max-w-4xl mx-auto gap-6 md:gap-4 w-full">
				{/* Connector line (desktop only) */}
				<div className="hidden md:block absolute top-10 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

				{steps.map((step, index) => (
					<div
						key={step.name}
						className="relative mx-auto flex flex-col items-center text-center md:flex-1 gap-4"
					>
						{/* Step number + icon */}
						<div className="relative">
							<div className="w-20 h-20 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-blue-400 shadow-lg shadow-black/30">
								{step.icon}
							</div>
							<span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-blue-500 text-white text-[10px] font-black flex items-center justify-center">
								{index + 1}
							</span>
						</div>

						{/* Text */}
						<div className="space-y-2 max-w-[220px]">
							<h3 className="font-bold text-white text-base">{step.name}</h3>
							<p className="text-zinc-500 text-sm leading-relaxed">
								{step.description}
							</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};
