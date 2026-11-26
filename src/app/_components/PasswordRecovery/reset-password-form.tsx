"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { FaLock } from "react-icons/fa6";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { resetAccountPassword } from "./password-recovery.actions";
import { resetPasswordSchema, type ResetPasswordValues } from "./password-recovery.logic";

type ResetPasswordFormProps = { email: string };
const inputClassName = "h-13 w-full rounded-xl border-slate-200 bg-white px-11 text-sm text-slate-800 placeholder:text-slate-400 focus-visible:border-green-600 focus-visible:ring-green-100";

export function ResetPasswordForm({ email }: ResetPasswordFormProps) {
  const router = useRouter();
  const { control, handleSubmit, formState: { isSubmitting } } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { email, newPassword: "", confirmPassword: "" },
  });

  async function onSubmit(values: ResetPasswordValues) {
    const result = await resetAccountPassword(values);
    await Swal.fire({
      icon: result.success ? "success" : "error",
      title: result.success ? "Password reset" : "Could not reset password",
      text: result.message,
      confirmButtonColor: "#16a34a",
    });
    if (result.success) router.replace("/login");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {(["newPassword", "confirmPassword"] as const).map((name) => (
        <Controller key={name} name={name} control={control} render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name} className="text-xs font-semibold text-slate-700">
              {name === "newPassword" ? "New Password" : "Confirm Password"}
            </FieldLabel>
            <div className="relative">
              <FaLock className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />
              <Input {...field} id={field.name} type="password" autoComplete={name === "newPassword" ? "new-password" : "new-password"} placeholder={name === "newPassword" ? "Enter new password" : "Confirm new password"} aria-invalid={fieldState.invalid} className={inputClassName} />
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )} />
      ))}

      {!email && <p role="alert" className="text-sm text-rose-600">Your reset session is missing its email. Start again from Forgot Password.</p>}
      <Button type="submit" disabled={isSubmitting || !email} className="h-13 w-full rounded-xl bg-green-600 font-semibold text-white shadow-md shadow-green-700/15 hover:bg-green-700">
        {isSubmitting ? "Resetting password..." : "Reset Password"}
      </Button>
    </form>
  );
}
