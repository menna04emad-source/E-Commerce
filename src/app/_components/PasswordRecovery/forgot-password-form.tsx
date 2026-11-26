"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa6";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { requestPasswordReset } from "./password-recovery.actions";
import { forgotPasswordSchema, type ForgotPasswordValues } from "./password-recovery.logic";

const inputClassName = "h-13 w-full rounded-xl border-slate-200 bg-white px-11 text-sm text-slate-800 placeholder:text-slate-400 focus-visible:border-green-600 focus-visible:ring-green-100";

export function ForgotPasswordForm() {
  const router = useRouter();
  const { control, handleSubmit, formState: { isSubmitting } } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: ForgotPasswordValues) {
    const result = await requestPasswordReset(values);
    await Swal.fire({
      icon: result.success ? "success" : "error",
      title: result.success ? "Check your email" : "Could not send the code",
      text: result.message,
      confirmButtonColor: "#16a34a",
    });
    if (result.success) router.push(`/verify-reset-code?email=${encodeURIComponent(values.email)}`);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Controller name="email" control={control} render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name} className="text-xs font-semibold text-slate-700">Email Address</FieldLabel>
          <div className="relative">
            <FaEnvelope className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />
            <Input {...field} id={field.name} type="email" autoComplete="email" placeholder="Enter your email address" aria-invalid={fieldState.invalid} className={inputClassName} />
          </div>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )} />

      <Button type="submit" disabled={isSubmitting} className="h-13 w-full rounded-xl bg-green-600 font-semibold text-white shadow-md shadow-green-700/15 hover:bg-green-700">
        {isSubmitting ? "Sending reset code..." : "Send Reset Code"}
      </Button>
      <div className="text-center">
        <Link href="/login" className="inline-flex items-center gap-2 text-sm font-medium text-green-600 hover:text-green-700">
          <FaArrowLeft /> Back to Sign In
        </Link>
      </div>
      <p className="border-t border-slate-100 pt-5 text-center text-sm text-slate-600">
        Remember your password? <Link href="/login" className="font-semibold text-green-600 hover:text-green-700">Sign In</Link>
      </p>
    </form>
  );
}
