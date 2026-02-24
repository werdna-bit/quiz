export type SolutionStep = {
	id: string;
	label: string; // "Calculate I = b × h³ / 12"
	expression: string | null; // "b * h^3 / 12"
	resultLabel: string | null; // "I"
	unit: string | null; // "mm⁴"
};

export type SolutionSteps = SolutionStep[];
