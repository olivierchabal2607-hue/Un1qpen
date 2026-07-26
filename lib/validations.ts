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
