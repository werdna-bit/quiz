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

export const Route = createFileRoute("/_guest/login")({
	component: LoginForm,
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

function LoginForm() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const {
		handleSubmit,
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

	const { mutate: loginMutate, isPending } = useMutation({
		mutationFn: async (data: { pin: string; phoneNumber: string }) => {
			const { data: result, error } = await authClient.signIn.phoneNumber({
				phoneNumber: data.phoneNumber,
				password: `${data.pin}${data.phoneNumber}`,
			});
			if (error) throw new Error(error.message);
			return result;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: authQueryOptions().queryKey,
			});
			toast.success("Welcome back!");
			navigate({ to: redirectUrl });
		},
		onError: (error) => {
			toast.error(error.message || "Invalid phone number or PIN.");
		},
	});

	const onSubmit: SubmitHandler<AuthSchemaType> = (data) => {
		if (isPending) return;
		loginMutate(data);
	};

	return (
		<div className="flex flex-col gap-8">
			{/* Header */}
			<div className="flex flex-col gap-1.5 text-center">
				<Link to="/" className="font-black text-lg mx-auto mb-2 tracking-tight">
					NUST <span className="text-blue-400">Solutions</span>
				</Link>
				<h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
				<p className="text-sm text-zinc-500">
					Sign in with your phone number and PIN
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
						6-Digit PIN
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
						"Sign In"
					)}
				</Button>
			</form>

			{/* Footer */}
			<p className="text-center text-sm text-zinc-500">
				Don't have an account?{" "}
				<Link
					to="/signup"
					className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
				>
					Create one
				</Link>
			</p>
		</div>
	);
}
