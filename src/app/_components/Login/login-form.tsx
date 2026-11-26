"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaLock, FaEnvelope } from "react-icons/fa6";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginSchema, type LoginFormValues } from "./login.logic";

const inputClassName =
  "h-12 w-full rounded-xl border-slate-200 bg-white px-11 text-sm text-slate-800 shadow-none placeholder:text-slate-400 focus-visible:border-green-600 focus-visible:ring-green-100";

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  async function onSubmit(values: LoginFormValues) {
    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      rememberMe: String(values.rememberMe),
      redirect: false,
    });

    await Swal.fire({
      icon: result?.error ? "error" : "success",
      title: result?.error ? "Sign in failed" : "Welcome back!",
      text: result?.error ? "Check your email and password, then try again." : "You are signed in to FreshCart.",
      confirmButtonColor: "#16a34a",
    });

    if (!result?.error) {
      const callbackUrl = new URLSearchParams(window.location.search).get("callbackUrl");
      const destination = callbackUrl?.startsWith("/") && !callbackUrl.startsWith("//") ? callbackUrl : "/";
      router.replace(destination);
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name} className="text-xs font-semibold text-slate-700">
              Email Address
            </FieldLabel>
            <div className="relative">
              <FaEnvelope className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />
              <Input
                {...field}
                id={field.name}
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                aria-invalid={fieldState.invalid}
                className={inputClassName}
              />
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor={field.name} className="text-xs font-semibold text-slate-700">
                Password
              </FieldLabel>
              <Link href="/forgot-password" className="text-xs font-medium text-green-600 hover:text-green-700">
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <FaLock className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />
              <Input
                {...field}
                id={field.name}
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                aria-invalid={fieldState.invalid}
                className={`${inputClassName} pr-12`}
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((visible) => !visible)}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="rememberMe"
        control={control}
        render={({ field }) => (
          <label className="flex items-center gap-2 text-xs text-slate-600">
            <input
              ref={field.ref}
              name={field.name}
              type="checkbox"
              checked={field.value}
              onBlur={field.onBlur}
              onChange={field.onChange}
              className="size-4 rounded border-slate-300 accent-green-600"
            />
            Keep me signed in
          </label>
        )}
      />

      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-12 w-full rounded-xl bg-green-600 font-semibold text-white shadow-md shadow-green-700/15 hover:bg-green-700 disabled:opacity-70"
      >
        {isSubmitting ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
}
