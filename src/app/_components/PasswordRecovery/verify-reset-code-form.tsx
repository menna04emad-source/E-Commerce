"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa6";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { requestPasswordReset, verifyPasswordResetCode } from "./password-recovery.actions";
import { verifyResetCodeSchema, type VerifyResetCodeValues } from "./password-recovery.logic";

type VerifyResetCodeFormProps = { email: string };

export function VerifyResetCodeForm({ email }: VerifyResetCodeFormProps) {
  const router = useRouter();
  const { control, handleSubmit, formState: { isSubmitting } } = useForm<VerifyResetCodeValues>({
    resolver: zodResolver(verifyResetCodeSchema),
    defaultValues: { resetCode: "" },
  });

  async function onSubmit(values: VerifyResetCodeValues) {
    const result = await verifyPasswordResetCode(values);
    await Swal.fire({
      icon: result.success ? "success" : "error",
      title: result.success ? "Code verified" : "Verification failed",
      text: result.message,
      confirmButtonColor: "#16a34a",
    });
    if (result.success) router.push(`/reset-password?email=${encodeURIComponent(email)}`);
  }

  async function resendCode() {
    const result = await requestPasswordReset({ email });
    await Swal.fire({
      icon: result.success ? "success" : "error",
      title: result.success ? "Code sent" : "Could not resend code",
      text: result.message,
      confirmButtonColor: "#16a34a",
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Controller name="resetCode" control={control} render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name} className="text-xs font-semibold text-slate-700">Verification Code</FieldLabel>
          <Input
            {...field}
            id={field.name}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            placeholder="• • • • • •"
            aria-invalid={fieldState.invalid}
            className="h-16 w-full rounded-xl border-slate-200 text-center text-xl tracking-[0.65em] text-slate-800 placeholder:text-slate-400 placeholder:tracking-[0.65em] focus-visible:border-green-600 focus-visible:ring-green-100"
            onChange={(event) => field.onChange(event.target.value.replace(/\D/g, "").slice(0, 6))}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )} />

      <p className="text-center text-xs text-slate-500">
        Didn&apos;t receive the code? <button type="button" onClick={resendCode} className="font-semibold text-green-600 hover:text-green-700">Resend Code</button>
      </p>

      <Button type="submit" disabled={isSubmitting || !email} className="h-13 w-full rounded-xl bg-green-600 font-semibold text-white shadow-md shadow-green-700/15 hover:bg-green-700">
        {isSubmitting ? "Verifying code..." : "Verify Code"}
      </Button>
      <div className="text-center">
        <Link href="/forgot-password" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-green-700">
          <FaArrowLeft /> Change email address
        </Link>
      </div>
    </form>
  );
}
