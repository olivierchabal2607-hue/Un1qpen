import { z } from "zod";
export const contactSchema = z.object({
  firstName: z.string().min(2, "Indiquez votre prénom."),
  lastName: z.string().min(2, "Indiquez votre nom."),
  company: z.string().min(2, "Indiquez votre société."),
  role: z.string().min(2, "Indiquez votre fonction."),
  email: z.string().email("Adresse e-mail invalide."),
  phone: z.string().optional(),
  country: z.string().min(2, "Indiquez votre pays."),
  requestType: z.string().min(1, "Choisissez un type de demande."),
  volume: z.string().optional(),
  message: z.string().min(10, "Votre message doit contenir au moins 10 caractères."),
  consent: z.literal(true, { errorMap: () => ({ message: "Votre consentement est nécessaire." }) }),
  website: z.string().max(0).optional(),
});
export type ContactInput = z.infer<typeof contactSchema>;

export const quoteConfigurationSchema = z.object({
  penColor: z.enum(["white", "warmGrey", "black"]),
  markingColor: z.enum(["white", "warmGrey", "black"]),
  markingLocation: z.enum(["clip", "body", "both"]),
  activeView: z.enum(["view1", "view2", "view3", "view4", "view5", "view6"]),
  logoScale: z.number().min(.45).max(5),
  logoRotation: z.number().min(-180).max(180),
  logoPosition: z.object({ x: z.number().min(0).max(1), y: z.number().min(0).max(1) }),
  preserveRatio: z.boolean(),
  quantity: z.number().int().min(500, "La quantité minimale est de 500 pièces."),
  customerDetails: z.object({
    company: z.string().min(2, "Indiquez votre société."),
    firstName: z.string().min(2, "Indiquez votre prénom."),
    lastName: z.string().min(2, "Indiquez votre nom."),
    email: z.string().email("Adresse e-mail invalide."),
    phone: z.string().min(6, "Indiquez votre téléphone."),
    deliveryDate: z.string().optional(),
    comment: z.string().optional(),
    consent: z.literal(true, { errorMap: () => ({ message: "Votre consentement est nécessaire." }) }),
  }),
});

export type QuoteConfiguration = z.infer<typeof quoteConfigurationSchema>;
