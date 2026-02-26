import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MenuIcon, X } from "lucide-react";
import { useState } from "react";
import { DepartmentSection } from "@/components/sections/department-section";
import { HeroSection } from "@/components/sections/hero-section";
import { HowItWorks } from "@/components/sections/how-it-works-section";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
	component: HomePage,
});

function HomePage() {
	const [open, setOpen] = useState(false);

	return (
		<div className="flex min-h-svh flex-col">
			{/* ── NAVBAR ─────────────────────────────────────────────── */}
			<header className="w-full bg-background/70 backdrop-blur-md border-b border-zinc-800/60 fixed top-0 left-0 z-50">
				<div className="w-full max-w-6xl mx-auto flex items-center justify-between h-16 px-4">
					{/* Logo */}
					<Link to="/" className="font-black text-lg tracking-tight">
						NUST <span className="text-blue-400 font-black">Solutions</span>
					</Link>

					{/* Desktop nav */}
					<nav className="hidden md:flex items-center gap-8 text-sm">
						<a
							href="#subjects"
							className="text-zinc-400 hover:text-white transition-colors duration-200"
						>
							Subjects
						</a>
						<a
							href="#how-it-works"
							className="text-zinc-400 hover:text-white transition-colors duration-200"
						>
							How It Works
						</a>
						<a
							href="#pricing"
							className="text-zinc-400 hover:text-white transition-colors duration-200"
						>
							Pricing
						</a>
					</nav>

					{/* Desktop auth buttons */}
					<div className="hidden md:flex items-center gap-2">
						<Button
							variant="ghost"
							className="text-zinc-400 hover:text-white h-9 px-4 text-sm"
							nativeButton={false}
							render={<Link to="/login" />}
						>
							Sign In
						</Button>
						<Button
							className="bg-blue-500 hover:bg-blue-400 text-white h-9 px-4 text-sm font-semibold shadow-lg shadow-blue-500/20"
							nativeButton={false}
							render={<Link to="/signup" />}
						>
							Sign Up
						</Button>
					</div>

					{/* Mobile hamburger */}
					<button
						onClick={() => setOpen((prev) => !prev)}
						type="button"
						className="md:hidden hover:opacity-60 transition-opacity duration-200"
						aria-label="Toggle menu"
					>
						{open ? <X size={20} /> : <MenuIcon size={20} />}
					</button>
				</div>

				{/* Mobile nav dropdown */}
				<div
					className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-zinc-800/60 bg-background ${
						open ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
					}`}
				>
					<ul className="flex flex-col gap-1 p-4 text-sm">
						<li>
							<a
								href="#subjects"
								onClick={() => setOpen(false)}
								className="block py-2 px-3 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-all duration-200"
							>
								Subjects
							</a>
						</li>
						<li>
							<a
								href="#how-it-works"
								onClick={() => setOpen(false)}
								className="block py-2 px-3 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-all duration-200"
							>
								How It Works
							</a>
						</li>
						<li>
							<a
								href="#pricing"
								onClick={() => setOpen(false)}
								className="block py-2 px-3 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-all duration-200"
							>
								Pricing
							</a>
						</li>
						<li className="pt-3 flex flex-col gap-2">
							<Button
								variant="outline"
								className="w-full h-10 border-zinc-700"
								nativeButton={false}
								render={<Link to="/login" />}
							>
								Sign In
							</Button>
							<Button
								className="w-full h-10 bg-blue-500 hover:bg-blue-400 text-white font-semibold"
								render={<Link to="/signup" />}
								nativeButton={false}
							>
								Sign Up
							</Button>
						</li>
					</ul>
				</div>
			</header>

			{/* ── PAGE CONTENT ───────────────────────────────────────── */}
			<main className="flex-1 pt-16 flex flex-col">
				<HeroSection />
				<DepartmentSection />
				<HowItWorks />

				{/* ── PRICING ──────────────────────────────────────────── */}
				<section
					id="pricing"
					className="w-full flex flex-col items-center p-4 py-24 border-b border-zinc-800/60 justify-center gap-10"
				>
					<div className="text-center space-y-3 max-w-xl mx-auto">
						<p className="text-xs font-semibold tracking-widest text-blue-400 uppercase">
							Pricing
						</p>
						<h2 className="font-black text-3xl md:text-5xl tracking-tight">
							Simple, Affordable Access
						</h2>
						<p className="text-zinc-400 text-sm md:text-base">
							No subscriptions. Pay only for what you need.
						</p>
					</div>

					<div className="grid md:grid-cols-2 gap-4 w-full max-w-2xl mx-auto">
						{/* Per quiz */}
						<div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-8 space-y-4">
							<div className="space-y-1">
								<p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
									Single Quiz
								</p>
								<div className="flex items-baseline gap-1">
									<span className="text-4xl font-black text-white">N$14</span>
									<span className="text-zinc-500 text-sm">/ quiz</span>
								</div>
							</div>
							<p className="text-zinc-400 text-sm">
								Unlock all questions and full worked solutions for one quiz.
							</p>
							<Button
								variant="outline"
								className="w-full h-10 border-zinc-700 hover:border-blue-500 text-sm"
								render={<Link to="/signup" />}
								nativeButton={false}
							>
								Get Started
							</Button>
						</div>

						{/* Full platform */}
						<div className="relative bg-blue-500/10 border border-blue-500/40 rounded-2xl p-8 space-y-4 overflow-hidden">
							<div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-blue-500 text-white text-[10px] font-bold uppercase tracking-wider">
								Best Value
							</div>
							<div className="space-y-1">
								<p className="text-xs font-semibold text-blue-400 uppercase tracking-widest">
									Full Platform
								</p>
								<div className="flex items-baseline gap-1">
									<span className="text-4xl font-black text-white">N$100</span>
									<span className="text-zinc-500 text-sm">/ all quizzes</span>
								</div>
							</div>
							<p className="text-zinc-400 text-sm">
								Unlimited access to every quiz and solution across all
								departments.
							</p>
							<Button
								className="w-full h-10 bg-blue-500 hover:bg-blue-400 text-white font-semibold text-sm shadow-lg shadow-blue-500/20"
								nativeButton={false}
								render={<Link to="/signup" />}
							>
								Get Full Access
								<ArrowRight size={14} className="ml-1" />
							</Button>
						</div>
					</div>
				</section>

				{/* ── CTA ──────────────────────────────────────────────── */}
				<section className="w-full flex flex-col items-center p-4 py-24 border-b border-zinc-800/60 justify-center">
					<div className="relative bg-zinc-900/60 w-full text-center max-w-2xl mx-auto px-6 md:px-12 py-14 space-y-5 border border-zinc-800 rounded-2xl overflow-hidden">
						{/* glow */}
						<div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-1 bg-blue-500/60 rounded-full blur-sm" />
						<h2 className="text-2xl md:text-4xl font-black tracking-tight">
							Ready to study smarter?
						</h2>
						<p className="text-zinc-400 text-sm md:text-base max-w-md mx-auto">
							Join NUST engineering students who are already using worked
							solutions to complete their quizzes with confidence.
						</p>
						<Button
							className="bg-blue-500 hover:bg-blue-400 text-white h-11 px-8 font-semibold shadow-lg shadow-blue-500/20 mx-auto flex items-center gap-2"
							render={<Link to="/signup" />}
							nativeButton={false}
						>
							Create Free Account
							<ArrowRight size={16} />
						</Button>
					</div>
				</section>

				{/* ── FOOTER ───────────────────────────────────────────── */}
				<footer className="w-full border-t border-zinc-800/60">
					{/* Footer links */}
					<div className="w-full max-w-6xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
						{/* Brand */}
						<div className="col-span-2 md:col-span-1 space-y-3">
							<h2 className="font-black text-base">
								NUST <span className="text-blue-400">Solutions</span>
							</h2>
							<p className="text-xs text-zinc-500 leading-relaxed max-w-[200px]">
								Helping NUST engineering students ace their quizzes with
								verified, step-by-step solutions.
							</p>
						</div>

						{/* Departments */}
						<div className="space-y-4">
							<h3 className="font-bold uppercase text-xs tracking-widest text-zinc-400">
								Departments
							</h3>
							<div className="flex flex-col gap-2.5">
								{["Civil", "Mechanical", "Electrical", "Chemical"].map(
									(text) => (
										<Link
											key={text}
											to="/subjects/$slug"
											params={{ slug: text.toLowerCase() }}
											className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors duration-200"
										>
											{text} Engineering
										</Link>
									),
								)}
							</div>
						</div>

						{/* Platform */}
						<div className="space-y-4">
							<h3 className="font-bold uppercase text-xs tracking-widest text-zinc-400">
								Platform
							</h3>
							<div className="flex flex-col gap-2.5">
								{[
									{ label: "How It Works", href: "#how-it-works" },
									{ label: "Pricing", href: "#pricing" },
									{ label: "Sign Up", href: "/signup" },
									{ label: "Sign In", href: "/login" },
								].map((item) => (
									<a
										key={item.label}
										href={item.href}
										className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors duration-200"
									>
										{item.label}
									</a>
								))}
							</div>
						</div>

						{/* Legal */}
						<div className="space-y-4">
							<h3 className="font-bold uppercase text-xs tracking-widest text-zinc-400">
								Legal
							</h3>
							<div className="flex flex-col gap-2.5">
								{["Terms of Service", "Privacy Policy", "Refund Policy"].map(
									(text) => (
										<Link
											key={text}
											to="/"
											className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors duration-200"
										>
											{text}
										</Link>
									),
								)}
							</div>
						</div>
					</div>

					{/* Bottom bar */}
					<div className="border-t border-zinc-800/60">
						<div className="w-full max-w-6xl mx-auto px-4 h-14 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-zinc-600">
							<p>
								© {new Date().getFullYear()} NUST Solutions. All rights
								reserved.
							</p>
							<p>Built for NUST engineering students, by NUST graduates.</p>
						</div>
					</div>
				</footer>
			</main>
		</div>
	);
}
