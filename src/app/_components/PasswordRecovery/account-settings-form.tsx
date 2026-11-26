"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { changeAccountPassword, updateAccountInfo } from "./password-recovery.actions";
import {
  changePasswordSchema,
  updateProfileSchema,
  type ChangePasswordValues,
  type UpdateProfileValues,
} from "./password-recovery.logic";

const inputClassName = "h-11 w-full rounded-xl border-slate-200 bg-white text-sm text-slate-800 placeholder:text-slate-400 focus-visible:border-green-600 focus-visible:ring-green-100";

export function AccountSettingsForm() {
  const profileForm = useForm<UpdateProfileValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: { name: "", email: "", phone: "" },
  });
  const passwordForm = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { currentPassword: "", password: "", rePassword: "" },
  });

  async function saveProfile(values: UpdateProfileValues) {
    const result = await updateAccountInfo(values);
    await Swal.fire({
      icon: result.success ? "success" : "error",
      title: result.success ? "Profile updated" : "Could not update profile",
      text: result.message,
      confirmButtonColor: "#16a34a",
    });
  }

  async function savePassword(values: ChangePasswordValues) {
    const result = await changeAccountPassword(values);
    await Swal.fire({
      icon: result.success ? "success" : "error",
      title: result.success ? "Password updated" : "Could not update password",
      text: result.message,
      confirmButtonColor: "#16a34a",
    });
    if (result.success) passwordForm.reset();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-lg shadow-slate-900/5 sm:p-7">
        <h2 className="text-xl font-bold text-slate-800">Personal Information</h2>
        <p className="mt-1 text-sm text-slate-500">Update the name, email, and phone on your account.</p>
        <form onSubmit={profileForm.handleSubmit(saveProfile)} className="mt-6 space-y-4">
          {(["name", "email", "phone"] as const).map((name) => (
            <Controller key={name} name={name} control={profileForm.control} render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={`profile-${name}`} className="text-xs font-semibold text-slate-700">
                  {name === "name" ? "Full Name" : name === "email" ? "Email Address" : "Phone Number"}
                </FieldLabel>
                <Input {...field} id={`profile-${name}`} type={name === "email" ? "email" : name === "phone" ? "tel" : "text"} autoComplete={name === "name" ? "name" : name === "email" ? "email" : "tel"} placeholder={name === "name" ? "Your name" : name === "email" ? "you@example.com" : "+1 234 567 8900"} aria-invalid={fieldState.invalid} className={inputClassName} />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )} />
          ))}
          <Button type="submit" disabled={profileForm.formState.isSubmitting} className="h-11 w-full rounded-xl bg-green-600 font-semibold text-white hover:bg-green-700">
            {profileForm.formState.isSubmitting ? "Saving..." : "Save Information"}
          </Button>
        </form>
      </section>

      <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-lg shadow-slate-900/5 sm:p-7">
        <h2 className="text-xl font-bold text-slate-800">Change Password</h2>
        <p className="mt-1 text-sm text-slate-500">Choose a new password to keep your account secure.</p>
        <form onSubmit={passwordForm.handleSubmit(savePassword)} className="mt-6 space-y-4">
          {(["currentPassword", "password", "rePassword"] as const).map((name) => (
            <Controller key={name} name={name} control={passwordForm.control} render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={`password-${name}`} className="text-xs font-semibold text-slate-700">
                  {name === "currentPassword" ? "Current Password" : name === "password" ? "New Password" : "Confirm New Password"}
                </FieldLabel>
                <Input {...field} id={`password-${name}`} type="password" autoComplete={name === "currentPassword" ? "current-password" : "new-password"} placeholder="••••••••" aria-invalid={fieldState.invalid} className={inputClassName} />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )} />
          ))}
          <Button type="submit" disabled={passwordForm.formState.isSubmitting} className="h-11 w-full rounded-xl bg-green-600 font-semibold text-white hover:bg-green-700">
            {passwordForm.formState.isSubmitting ? "Updating..." : "Update Password"}
          </Button>
        </form>
      </section>
    </div>
  );
}
