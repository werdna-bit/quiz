import { ArrowRight, CircleCheckBigIcon } from "lucide-react";
import { Button } from "../ui/button";
export const HeroSection = () => {
	return (
		<section className="w-full min-h-svh p-4 flex flex-col items-center justify-center gap-10  flex-1">
			{/*HERO SECTION*/}
			<div className="text-center grid gap-5">
				<div className="text-center text-4xl md:text-6xl font-[700]">
					<h1>Ace Your</h1>
					<h1>
						Engineering <span className="text-blue-400">Quizzes</span>
					</h1>
				</div>
				<p className="text-gray-500 max-w-[500px] mx-auto text-center">
					Unlock detailed,step-by-step worked solutions to all your
					quizzes.Study smarter, not harder -and submit every quiz with
					confidence.
				</p>
			</div>
			<div className="flex items-center gap-4 mx-auto max-w-xl">
				<Button
					className={
						" bg-blue-400 hover:bg-blue-500 flex items-center flex-1 h-10 px-4"
					}
				>
					Get Started
					<ArrowRight />
				</Button>

				<Button variant={"outline"} className={"h-10 flex-1 px-4"}>
					Browse Solutions
				</Button>
			</div>
			<div className="flex flex-col md:flex-row items-center text-center text-sm gap-3 md:gap-6">
				{["Verified worked solutions", "All major departments"].map((text) => (
					<div key={text} className="flex items-center gap-2">
						<CircleCheckBigIcon className="text-blue-500" size={15} />{" "}
						<p>{text}</p>
					</div>
				))}
			</div>
		</section>
	);
};
