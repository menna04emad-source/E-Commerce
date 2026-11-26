import { z } from "zod";

export const signupSchema = z
  .object({
    name: z.string().trim().min(2, "Enter your full name."),
    email: z.email("Enter a valid email address."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(/[0-9]/, "Password must include a number.")
      .regex(/[^A-Za-z0-9]/, "Password must include a symbol."),
    confirmPassword: z.string().min(1, "Confirm your password."),
    phone: z
      .string()
      .trim()
      .regex(/^\+?[0-9\s()-]{8,20}$/, "Enter a valid phone number."),
    terms: z.boolean().refine((accepted) => accepted, {
      message: "You must accept the terms to continue.",
    }),
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

export type SignupFormValues = z.infer<typeof signupSchema>;

