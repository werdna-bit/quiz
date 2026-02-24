import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { LoaderCircle } from "lucide-react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import authClient from "@/lib/auth/auth-client";
import { authQueryOptions } from "@/lib/auth/queries";

export const Route = createFileRoute("/_guest/signup")({
	component: SignUpForm,
});

export const AuthSchema = z.object({
	phoneNumber: z
		.string()
		.transform((val) => val.replace(/\D/g, ""))
		.refine((val) => val.length === 9, {
			message: "Phone number must be exactly 9 digits",
		})
		.transform((val) => `+264${val}`),
	pin: z.string().refine((val) => /^\d{6}$/.test(val), {
		message: "PIN must be exactly 6 digits",
	}),
});

export type AuthSchemaType = z.infer<typeof AuthSchema>;

function SignUpForm() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const {
		handleSubmit,
		reset,
		setValue,
		register,
		formState: { errors },
	} = useForm<AuthSchemaType>({
		resolver: zodResolver(AuthSchema),
		defaultValues: {
			pin: "",
			phoneNumber: "",
		},
	});

	const handlePinChange = (val: string) => {
		setValue("pin", val);
		if (val.length === 6) {
			handleSubmit(onSubmit)();
		}
	};

	const { redirectUrl } = Route.useRouteContext();

	const { mutate: signupMutate, isPending } = useMutation({
		mutationFn: async (data: { pin: string; phoneNumber: string }) => {
			const { error } = await authClient.signUp.email({
				email: `${data.phoneNumber.replace(/\D/g, "")}@nust-solutions.app`,
				name: data.phoneNumber,
				password: `${data.pin}${data.phoneNumber}`,
				phoneNumber: data.phoneNumber,
				callbackURL: redirectUrl,
			});
			if (error) throw new Error(error.message);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: authQueryOptions().queryKey,
			});
			toast.success("Account created! Welcome to NUST Solutions.");
			navigate({ to: redirectUrl });
		},
		onError: (error) => {
			toast.error(error.message || "An error occurred. Please try again.");
			reset();
		},
	});

	const onSubmit: SubmitHandler<AuthSchemaType> = (data) => {
		if (isPending) return;
		signupMutate(data);
	};

	return (
		<div className="flex flex-col gap-8">
			{/* Header */}
			<div className="flex flex-col gap-1.5 text-center">
				<Link to="/" className="font-black text-lg mx-auto mb-2 tracking-tight">
					NUST <span className="text-blue-400">Solutions</span>
				</Link>
				<h1 className="text-2xl font-bold tracking-tight">Create account</h1>
				<p className="text-sm text-zinc-500">
					Sign up with your Namibian phone number
				</p>
			</div>

			{/* Form */}
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
				{/* Phone number */}
				<div className="flex flex-col gap-2">
					<Label htmlFor="phone_number" className="text-sm font-medium">
						Phone Number
					</Label>
					<div className="relative w-full">
						<span className="absolute top-1/2 left-3 -translate-y-1/2 text-sm text-zinc-500 select-none pointer-events-none">
							+264
						</span>
						<Input
							id="phone_number"
							{...register("phoneNumber")}
							type="tel"
							inputMode="numeric"
							pattern="[0-9]*"
							maxLength={9}
							className="pl-14 h-11 bg-zinc-900 border-zinc-800 focus:border-blue-500 transition-colors"
							placeholder="81 234 5678"
							readOnly={isPending}
							required
							onInput={(e) => {
								e.currentTarget.value = e.currentTarget.value.replace(
									/\D/g,
									"",
								);
							}}
						/>
					</div>
					{errors.phoneNumber && (
						<p className="text-xs text-red-400">{errors.phoneNumber.message}</p>
					)}
				</div>

				{/* PIN */}
				<div className="flex flex-col gap-2">
					<Label htmlFor="pin" className="text-sm font-medium">
						Choose a 6-Digit PIN
					</Label>
					<InputOTP
						id="pin"
						onChange={handlePinChange}
						maxLength={6}
						pattern={REGEXP_ONLY_DIGITS}
						disabled={isPending}
					>
						<InputOTPGroup className="w-full">
							{[0, 1, 2, 3, 4, 5].map((i) => (
								<InputOTPSlot
									key={i}
									index={i}
									className="bg-background w-full"
								/>
							))}
						</InputOTPGroup>
					</InputOTP>
					{errors.pin && (
						<p className="text-xs text-red-400">{errors.pin.message}</p>
					)}
					<p className="text-xs text-zinc-600">
						Remember this PIN — you'll use it to sign in every time.
					</p>
				</div>

				{/* Submit */}
				<Button
					type="submit"
					disabled={isPending}
					className="h-11 bg-blue-500 hover:bg-blue-400 text-white font-semibold shadow-lg shadow-blue-500/20 transition-all duration-200 mt-1"
				>
					{isPending ? (
						<LoaderCircle size={16} className="animate-spin" />
					) : (
						"Create Account"
					)}
				</Button>
			</form>

			{/* Terms note */}
			<p className="text-center text-xs text-zinc-600 -mt-3">
				By signing up you agree to our{" "}
				<Link
					to="/"
					className="underline hover:text-zinc-400 transition-colors"
				>
					Terms of Service
				</Link>
			</p>

			{/* Footer */}
			<p className="text-center text-sm text-zinc-500">
				Already have an account?{" "}
				<Link
					to="/login"
					className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
				>
					Sign in
				</Link>
			</p>
		</div>
	);
}
