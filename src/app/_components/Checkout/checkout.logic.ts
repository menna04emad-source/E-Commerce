import { z } from "zod";

export const checkoutAddressSchema = z.object({
  details: z.string().trim().min(5, "Enter your street address."),
  phone: z.string().trim().regex(/^\+?[0-9\s()-]{8,20}$/, "Enter a valid phone number."),
  city: z.string().trim().min(2, "Enter your city."),
  postalCode: z.string().trim().optional(),
});

export type CheckoutAddressValues = z.infer<typeof checkoutAddressSchema>;
