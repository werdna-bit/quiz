import { Link } from "@tanstack/react-router";
import { ArrowRight, CircleCheckBig, FlaskConical, Zap } from "lucide-react";
import { Button } from "../ui/button";

export const HeroSection = () => {
	return (
		<section className="relative w-full min-h-svh flex flex-col items-center justify-center gap-12 p-4 overflow-hidden">
			{/* Background grid + glow */}
			<div
				className="pointer-events-none absolute inset-0 -z-10"
				aria-hidden="true"
			>
				{/* subtle grid */}
				<div
					className="absolute inset-0 opacity-[0.04]"
					style={{
						backgroundImage:
							"linear-gradient(to right, #60a5fa 1px, transparent 1px), linear-gradient(to bottom, #60a5fa 1px, transparent 1px)",
						backgroundSize: "48px 48px",
					}}
				/>
				{/* radial glow */}
				<div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[120px]" />
			</div>

			{/* Badge */}
			<div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-medium tracking-wide">
				<span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
				NUST Engineering Solutions Platform
			</div>

			{/* Headline */}
			<div className="text-center space-y-3 max-w-3xl mx-auto">
				<h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05]">
					Ace Your
					<br />
					Engineering{" "}
					<span className="relative inline-block">
						<span className="text-blue-400">Quizzes</span>
						<span className="absolute -bottom-1 left-0 w-full h-[3px] bg-blue-400/40 rounded-full" />
					</span>
				</h1>
				<p className="text-zinc-400 max-w-md mx-auto text-base md:text-lg leading-relaxed">
					Unlock detailed, step-by-step worked solutions to your past exam
					papers. Study smarter — submit every quiz with confidence.
				</p>
			</div>

			{/* CTAs */}
			<div className="flex items-center gap-3 w-full max-w-xs mx-auto">
				<Button
					className="bg-blue-500 hover:bg-blue-400 text-white flex-1 h-11 font-semibold shadow-lg shadow-blue-500/20 transition-all duration-200"
					render={<Link to="/signup" />}
					nativeButton={false}
				>
					Get Started
					<ArrowRight size={16} className="ml-1" />
				</Button>
				<Button
					variant="outline"
					className="flex-1 h-11 border-zinc-700 hover:border-zinc-500 text-zinc-300"
					render={<Link to="/" />}
					nativeButton={false}
				>
					Browse
				</Button>
			</div>

			{/* Trust badges */}
			<div className="flex flex-wrap items-center justify-center gap-4 text-sm text-zinc-400">
				{[
					"Verified worked solutions",
					"All major departments",
					"Student-friendly pricing",
				].map((text) => (
					<div key={text} className="flex items-center gap-1.5">
						<CircleCheckBig size={14} className="text-blue-500 shrink-0" />
						<span>{text}</span>
					</div>
				))}
			</div>

			{/* Floating subject pills */}
			<div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-3 opacity-40">
				{[
					{ icon: <FlaskConical size={12} />, label: "Chemical" },
					{ icon: <Zap size={12} />, label: "Electrical" },
				].map((item) => (
					<div
						key={item.label}
						className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-700 text-xs text-zinc-500"
					>
						{item.icon}
						{item.label}
					</div>
				))}
			</div>
		</section>
	);
};
