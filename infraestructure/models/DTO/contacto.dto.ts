import { z } from "zod";

export const ContactDTOSchema = z.object({
  // name: z.string().min(1, "El nombre es requerido"),
  // email: z.string().min(1, "El email es requerido"),
  // photo: z.string().min(1, "La foto es requerida"),
  // userId: z.string().min(1, "El user id es requerido"),
  contactNick: z.string().min(1, "El user nick es requerido"),
});

export type ContactoDTO = z.infer<typeof ContactDTOSchema>;
