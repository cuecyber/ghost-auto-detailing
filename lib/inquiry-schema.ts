import { z } from "zod";

export const inquirySchema = z.object({
  firstName: z.string().trim().min(1).max(50),

  phone: z
    .string()
    .trim()
    .min(7)
    .max(20)
    .regex(/^[0-9()+\-.\s]+$/, "Enter a valid phone number"),

  vehicleYear: z
    .string()
    .trim()
    .regex(/^\d{4}$/, "Enter a four-digit year"),

  vehicle: z.string().trim().min(2).max(100),

  requestedService: z.enum([
    "refresh",
    "detail",
    "restoration",
    "recommendation",
  ]),

  conditions: z.array(z.string().max(50)).max(10).default([]),

  details: z.string().trim().min(10).max(1500),

  zipCode: z
    .string()
    .trim()
    .regex(/^\d{5}(-\d{4})?$/, "Enter a valid ZIP code"),

  utilities: z.enum(["water-electric", "water", "electric", "neither"]),

  website: z.string().max(0).optional().default(""),

  formStartedAt: z.number().int().positive(),

  contactConsent: z.literal(true),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
