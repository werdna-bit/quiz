import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { phoneNumber } from "better-auth/plugins";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { GalleryVerticalEnd, LoaderCircle } from "lucide-react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { SignInSocialButton } from "@/components/sign-in-social-button";
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
	const { handleSubmit, reset, setValue, register } = useForm<AuthSchemaType>({
		resolver: zodResolver(AuthSchema),
		defaultValues: {
			pin: "",
			phoneNumber: "",
		},
	});

	const handleChange = (val: string) => {
		setValue("pin", val);

		if (val.length === 6) {
			handleSubmit(onSubmit)();
		}
	};

	const { redirectUrl } = Route.useRouteContext();

	const { mutate: signupMutate, isPending } = useMutation({
		mutationFn: async (data: { pin: string; phoneNumber: string }) => {
			await authClient.signUp.email(
				{
					email: `${data.phoneNumber.replace(/\D/g, "")}@placeholder.com`,
					name: data.phoneNumber,
					password: `${data.pin}${data.phoneNumber}`,
					phoneNumber: data.phoneNumber,
					callbackURL: redirectUrl,
				},
				{
					onError: ({ error }) => {
						toast.error(error.message || "An error occurred while signing up.");
						reset();
					},
					onSuccess: () => {
						queryClient.removeQueries({
							queryKey: authQueryOptions().queryKey,
						});
						navigate({ to: redirectUrl });
					},
				},
			);
		},
	});
	const onSubmit: SubmitHandler<AuthSchemaType> = (data) => {
		if (isPending) return;
		signupMutate(data);
	};

	return (
		<div className="flex flex-col gap-6">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col gap-6">
					<div className="grid gap-3">
						<Label htmlFor="phone_number">Phone Number</Label>
						<div className="w-full relative">
							<Input
								id="phone_number"
								{...register("phoneNumber")}
								type="tel"
								inputMode="numeric"
								pattern="[0-9]*"
								maxLength={9}
								className="pl-14 h-10"
								placeholder="Enter a valid phone number"
								readOnly={isPending}
								required
								onInput={(e) => {
									e.currentTarget.value = e.currentTarget.value.replace(
										/\D/g,
										"",
									);
								}}
							/>
							<p className="absolute top-1/2 left-2 text-zinc-500 -translate-y-1/2">
								+264
							</p>
						</div>
					</div>
					<div className="grid gap-3">
						<Label htmlFor="pin">Enter Pin</Label>
						<InputOTP
							id="pin"
							onChange={handleChange}
							maxLength={6}
							className="w-full"
							pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
						>
							<InputOTPGroup className="w-full">
								<InputOTPSlot className="bg-background w-full" index={0} />
								<InputOTPSlot className="bg-background w-full" index={1} />
								<InputOTPSlot className="bg-background w-full" index={2} />
								<InputOTPSlot className="bg-background w-full" index={3} />
								<InputOTPSlot className="bg-background w-full" index={4} />
								<InputOTPSlot className="bg-background w-full" index={5} />
							</InputOTPGroup>
						</InputOTP>
					</div>
				</div>
			</form>
		</div>
	);
}
