import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, AtSignIcon, MenuIcon, X } from "lucide-react";
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
		<div className="flex min-h-svh flex-col gap-4 ">
			<header className="w-full bg-background/70 backdrop-blur-md  glass shadow-lg border-b-1  fixed top-0 left-0">
				<div className="w-full w-full max-w-5xl mx-auto flex items-center justify-between h-19 p-4">
					<h1 className="font-[500] text-xl">QUIZ Solutions</h1>
					<nav
						className={`absolute top-full transition-all duration-300 ease-in-out md:static md:opacity-100 md:scale-100 md:pointer-events-auto
  md:w-auto md:border-0 md:px-8 ${open ? "scale-100 opacity-100" : "opacity-0 pointer-events-none md:pointer-events-auto scale-97 md:scale-100 md:opacity-100"} w-full left-0 bg-background border p-5`}
					>
						<ul className="flex flex-col gap-4 md:flex-row   text-sm w-full">
							<li className="text-zinc-400 hover:text-white transition-all duration-200 ease-in-out">
								<Link to="/" className="w-full">
									Subjects
								</Link>
							</li>

							<li className="text-zinc-400 hover:text-white transition-all duration-200 ease-in-out">
								<Link to="/" className="w-full">
									How It Works
								</Link>
							</li>

							<li className="text-zinc-400 hover:text-white transition-all duration-200 ease-in-out">
								<Link to="/" className="w-full">
									Pricing
								</Link>
							</li>
							<Button
								className={"mt-4 md:hidden"}
								variant={"outline"}
								render={<Link to="/login"></Link>}
							>
								<p>Sign In</p>
							</Button>
							<Button
								render={<Link to="/signup"></Link>}
								className={" md:hidden w-full bg-blue-400 hover:bg-blue-500"}
							>
								<p>Sign Up</p>
							</Button>
						</ul>
					</nav>
					<button
						onClick={() => {
							setOpen((prev) => !prev);
						}}
						type="button"
						className="hover:opacity-60 md:hidden  transition-all duration-200 ease-in-out"
					>
						{open ? <X /> : <MenuIcon />}
					</button>
				</div>
			</header>

			<HeroSection />
			<DepartmentSection />
			<HowItWorks />

			<section className="w-full text-center  flex flex-col items-center p-4 py-20 border-b-1 justify-center">
				<div className="bg-card w-full text-center max-w-2xl mx-auto px-4 md:px-8 py-10 space-y-4 border border-zinc-800 rounded-lg">
					<h1 className="text-xl font-[700] md:text-3xl">
						Ready to start studying smarter?
					</h1>
					<p className="text-zinc-500 text-sm md:text-base">
						Join hundreds of NUST engineering students who are already uusing
						worked solution to complete their quizzes
					</p>

					<Button
						className={
							" bg-blue-400 hover:bg-blue-500 mt-8 flex items-center flex-1 h-10 px-4 mx-auto"
						}
					>
						Create Free Account
						<ArrowRight />
					</Button>
				</div>
			</section>

			<section className="w-full flex flex-col md:flex-row  gap-8 p-4  py-10">
				<div className="w-full mx-auto max-w-5xl flex flex-col md:flex-row gap-8">
					<div className="space-y-3 w-full md:w-[35%]">
						<h1 className="font-[500] text-lg">QUIZ Solutions</h1>
						<p className="text-sm text-zinc-400">
							Helping Nust engineering students ace their quizzes with verified,
							step-by-step past paper solutions.
						</p>
					</div>

					<div className="space-y-4 flex-1">
						<h2 className="font-bold uppercase text-sm">Departments</h2>
						<div className="flex flex-col gap-3">
							{["Civil", "Mechanical", "Electrical", "Chemical"].map((text) => (
								<Link
									key={text}
									to="/"
									className="text-xs w-full text-zinc-500"
								>
									{text} Engineering
								</Link>
							))}
						</div>
					</div>

					<div className="space-y-4 flex-1">
						<h2 className="font-bold uppercase text-sm">Platform</h2>
						<div className="flex flex-col gap-3">
							{["How It Works", "Pricing", "FAQs", "Contact Us"].map((text) => (
								<Link
									key={text}
									to="/"
									className="text-xs w-full text-zinc-500"
								>
									{text}
								</Link>
							))}
						</div>
					</div>

					<div className="space-y-4 flex-1">
						<h2 className="font-bold uppercase text-sm">Legal</h2>
						<div className="flex flex-col gap-3">
							{["Terms of Service", "Privacy Policy", "Refund Policy"].map(
								(text) => (
									<Link
										key={text}
										to="/"
										className="text-xs w-full text-zinc-500"
									>
										{text}
									</Link>
								),
							)}
						</div>
					</div>
				</div>
			</section>

			<footer className="border-t-1 h-30 max-w-5xl w-full mx-auto flex flex-col md:flex-row text-xs text-zinc-500 items-center gap-4 justify-center md:justify-between">
				<div className="flex items-center  gap-1">
					<AtSignIcon size={13} />
					<span>{new Date().getFullYear()}</span>
					<p>NUST Solutions. All right reserved.</p>
				</div>
				<p>Built for NUST engineering students, by NUST graduates</p>
			</footer>
		</div>
	);
}
