"use client";

import {
  Controller,
  type Control,
  type UseFormHandleSubmit,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Swal from "sweetalert2";
import type { SignupFormValues } from "./signup.logic";
import { createAccount } from "./signup.actions";

type MyFormProps = {
  control: Control<SignupFormValues>;
  handleSubmit: UseFormHandleSubmit<SignupFormValues>;
  isSubmitting: boolean;
};

const inputClassName =
  "h-10 w-full rounded-md border border-slate-300 bg-background px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus-visible:border-green-600 focus-visible:ring-2 focus-visible:ring-green-100";

export default function MyForm({
  control,
  handleSubmit,
  isSubmitting,
}: MyFormProps) {
  async function onSubmit(values: SignupFormValues) {
    const result = await createAccount(values);

    await Swal.fire({
      icon: result.success ? "success" : "error",
      title: result.success ? "Account created!" : "Could not create your account",
      text: result.message,
      confirmButtonColor: "#16a34a",
    });
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>
              Name<span className="text-xs">*</span>
            </FieldLabel>
            <Input
              {...field}
              id={field.name}
              type="text"
              placeholder="Ali"
              aria-invalid={fieldState.invalid}
              className={inputClassName}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>
              Email<span className="text-xs">*</span>
            </FieldLabel>
            <Input
              {...field}
              id={field.name}
              type="email"
              placeholder="ali@example.com"
              aria-invalid={fieldState.invalid}
              className={inputClassName}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>
              Password<span className="text-xs">*</span>
            </FieldLabel>
            <Input
              {...field}
              id={field.name}
              type="password"
              placeholder="create a strong password"
              aria-invalid={fieldState.invalid}
              className={inputClassName}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            {(() => {
              const password = field.value ?? "";
              const checks = [
                password.length >= 8,
                /[a-z]/.test(password) && /[A-Z]/.test(password),
                /\d/.test(password),
                /[^A-Za-z0-9]/.test(password),
                password.length >= 12,
              ];
              const score = checks.filter(Boolean).length;
              const strength = password.length === 0 ? "" : score <= 2 ? "Weak" : score === 3 ? "Fair" : score === 4 ? "Good" : "Strong";
              const activeColor = score <= 2 ? "bg-rose-500" : score === 3 ? "bg-amber-500" : score === 4 ? "bg-lime-500" : "bg-green-600";
              return (
                <div className="mt-2" aria-live="polite">
                  <div className="flex items-center gap-1.5" role="progressbar" aria-label="Password strength" aria-valuemin={0} aria-valuemax={5} aria-valuenow={score}>
                    {checks.map((_, index) => <span key={index} className={`h-1 flex-1 rounded-full ${index < score ? activeColor : "bg-slate-200"}`} />)}
                    <span className="ml-1 min-w-10 text-right text-xs text-slate-600">{strength}</span>
                  </div>
                </div>
              );
            })()}
            <p className="mt-1 text-xs text-slate-500">
              Must be at least 8 characters with numbers and symbols
            </p>
          </Field>
        )}
      />

      <Controller
        name="confirmPassword"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>
              Confirm Password<span className="text-xs">*</span>
            </FieldLabel>
            <Input
              {...field}
              id={field.name}
              type="password"
              placeholder="confirm your password"
              aria-invalid={fieldState.invalid}
              className={inputClassName}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="phone"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>
              Phone Number<span className="text-xs">*</span>
            </FieldLabel>
            <Input
              {...field}
              id={field.name}
              type="tel"
              placeholder="+1 234 567 8900"
              aria-invalid={fieldState.invalid}
              className={inputClassName}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="terms"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <label className="flex items-start gap-3 text-sm leading-5 text-slate-700">
              <input
                ref={field.ref}
                name={field.name}
                type="checkbox"
                checked={field.value}
                onBlur={field.onBlur}
                onChange={field.onChange}
                aria-invalid={fieldState.invalid}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-green-600"
              />
              <span>
                I agree to the{" "}
                <a href="#" className="text-green-600 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-green-600 hover:underline">
                  Privacy Policy
                </a>{" "}
                <span className="text-xs">*</span>
              </span>
            </label>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-green-600 font-semibold text-white hover:bg-green-700"
      >
        {isSubmitting ? "Creating your account..." : "Create My Account"}
      </Button>
    </form>
  );
}
