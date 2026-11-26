import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.email("Enter a valid email address."),
});

export const verifyResetCodeSchema = z.object({
  resetCode: z.string().trim().regex(/^\d{6}$/, "Enter the 6-digit code."),
});

export const resetPasswordSchema = z
  .object({
    email: z.email("Enter a valid email address."),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(/[0-9]/, "Password must include a number.")
      .regex(/[^A-Za-z0-9]/, "Password must include a symbol."),
    confirmPassword: z.string().min(1, "Confirm your new password."),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Enter your current password."),
    password: z.string().min(8, "New password must be at least 8 characters."),
    rePassword: z.string().min(1, "Confirm your new password."),
  })
  .refine((values) => values.password === values.rePassword, {
    path: ["rePassword"],
    message: "Passwords do not match.",
  });

export const updateProfileSchema = z.object({
  name: z.string().trim().min(2, "Enter your name."),
  email: z.email("Enter a valid email address."),
  phone: z.string().trim().regex(/^\+?[0-9\s()-]{8,20}$/, "Enter a valid phone number."),
});

export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;
export type VerifyResetCodeValues = z.infer<typeof verifyResetCodeSchema>;
export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
export type ChangePasswordValues = z.infer<typeof changePasswordSchema>;
export type UpdateProfileValues = z.infer<typeof updateProfileSchema>;
