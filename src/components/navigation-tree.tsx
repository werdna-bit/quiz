import {
	BookOpen,
	Calendar,
	FileText,
	ListChecks,
	Minus,
	Plus,
} from "lucide-react";
import { useState } from "react";

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

type NavigationTreeProps = {
	data: Course[];
	onQuizSelect?: (quizId: string) => void;
};

export function NavigationTree({ data, onQuizSelect }: NavigationTreeProps) {
	const [expandedCourses, setExpandedCourses] = useState<Set<string>>(
		new Set(),
	);
	const [expandedYears, setExpandedYears] = useState<Set<string>>(new Set());
	const [expandedModules, setExpandedModules] = useState<Set<string>>(
		new Set(),
	);

	const toggleCourse = (courseId: string) => {
		setExpandedCourses((prev) => {
			const next = new Set(prev);
			if (next.has(courseId)) {
				next.delete(courseId);
			} else {
				next.add(courseId);
			}
			return next;
		});
	};

	const toggleYear = (yearKey: string) => {
		setExpandedYears((prev) => {
			const next = new Set(prev);
			if (next.has(yearKey)) {
				next.delete(yearKey);
			} else {
				next.add(yearKey);
			}
			return next;
		});
	};

	const toggleModule = (moduleId: string) => {
		setExpandedModules((prev) => {
			const next = new Set(prev);
			if (next.has(moduleId)) {
				next.delete(moduleId);
			} else {
				next.add(moduleId);
			}
			return next;
		});
	};

	return (
		<div className="w-full bg-sidebar text-sidebar-foreground">
			{data.map((course) => {
				const isCourseExpanded = expandedCourses.has(course.id);

				return (
					<div key={course.id} className="border-b border-sidebar-border">
						{/* Course Level */}
						<button
							type="button"
							onClick={() => {
								toggleCourse(course.id);
							}}
							className="w-full flex items-center gap-3 px-4 py-3 hover:bg-sidebar-accent transition-colors text-left group"
						>
							<div className="w-5 h-5 flex items-center justify-center rounded-xs bg-sidebar-primary/10 group-hover:bg-sidebar-primary/20 transition-colors">
								{isCourseExpanded ? (
									<Minus className="w-3.5 h-3.5 text-sidebar-primary" />
								) : (
									<Plus className="w-3.5 h-3.5 text-sidebar-primary" />
								)}
							</div>
							<BookOpen className="w-4 h-4 flex-shrink-0 text-sidebar-primary" />
							<span className="font-semibold text-sm flex-1">
								{course.name}
							</span>
						</button>

						{/* Years */}
						{isCourseExpanded && (
							<div className="bg-sidebar-accent/30">
								{course.years.map((year) => {
									const yearKey = `${course.id}-year-${year.year}`;
									const isYearExpanded = expandedYears.has(yearKey);

									return (
										<div key={yearKey}>
											{/* Year Level */}
											<button
												type="button"
												onClick={() => toggleYear(yearKey)}
												className="w-full flex items-center gap-3 px-4 py-2.5 pl-8 hover:bg-sidebar-accent transition-colors text-left group"
											>
												<div className="w-5 h-5 flex items-center justify-center rounded-md bg-sidebar-primary/10 group-hover:bg-sidebar-primary/20 transition-colors">
													{isYearExpanded ? (
														<Minus className="w-3.5 h-3.5 text-sidebar-primary" />
													) : (
														<Plus className="w-3.5 h-3.5 text-sidebar-primary" />
													)}
												</div>
												<Calendar className="w-4 h-4 flex-shrink-0 text-muted-foreground" />
												<span className="font-medium text-sm flex-1">
													Year {year.year}
												</span>
												<span className="text-xs text-muted-foreground px-2 py-0.5 rounded-full bg-muted/50">
													{year.modules.length}
												</span>
											</button>

											{/* Modules */}
											{isYearExpanded && (
												<div className="bg-sidebar-accent/50">
													{year.modules.map((module) => {
														const isModuleExpanded = expandedModules.has(
															module.id,
														);
														const hasQuizzes = module.quizzes.length > 0;

														return (
															<div key={module.id}>
																{/* Module Level */}
																<button
																	type="button"
																	onClick={() =>
																		hasQuizzes && toggleModule(module.id)
																	}
																	disabled={!hasQuizzes}
																	className={`w-full flex items-center gap-3 px-4 py-2 pl-12 transition-colors text-left group ${
																		hasQuizzes
																			? "hover:bg-sidebar-accent cursor-pointer"
																			: "opacity-40 cursor-not-allowed"
																	}`}
																>
																	{hasQuizzes ? (
																		<div className="w-5 h-5 flex items-center justify-center rounded-md bg-sidebar-primary/10 group-hover:bg-sidebar-primary/20 transition-colors">
																			{isModuleExpanded ? (
																				<Minus className="w-3.5 h-3.5 text-sidebar-primary" />
																			) : (
																				<Plus className="w-3.5 h-3.5 text-sidebar-primary" />
																			)}
																		</div>
																	) : (
																		<div className="w-5 h-5" />
																	)}
																	<FileText className="w-4 h-4 flex-shrink-0 text-muted-foreground" />
																	<span className="text-sm flex-1">
																		{module.name}
																	</span>
																	{hasQuizzes && (
																		<span className="text-xs text-muted-foreground px-2 py-0.5 rounded-full bg-muted/50">
																			{module.quizzes.length}
																		</span>
																	)}
																</button>

																{/* Quizzes */}
																{isModuleExpanded && hasQuizzes && (
																	<div className="bg-card/30">
																		{module.quizzes.map((quiz) => (
																			<button
																				type="button"
																				key={quiz.id}
																				onClick={() => onQuizSelect?.(quiz.id)}
																				className="w-full flex items-center gap-3 px-4 py-2.5 pl-16 hover:bg-sidebar-primary/10 transition-colors text-left group border-l-2 border-transparent hover:border-sidebar-primary"
																			>
																				<ListChecks className="w-4 h-4 flex-shrink-0 text-muted-foreground group-hover:text-sidebar-primary transition-colors" />
																				<span className="text-sm text-sidebar-foreground/80 group-hover:text-sidebar-foreground transition-colors">
																					{quiz.title}
																				</span>
																			</button>
																		))}
																	</div>
																)}
															</div>
														);
													})}
												</div>
											)}
										</div>
									);
								})}
							</div>
						)}
					</div>
				);
			})}
		</div>
	);
}
