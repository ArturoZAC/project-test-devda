import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(5, "Mínimo 5 caracteres"),
  body: z.string().min(10, "El contenido debe tener al menos 10 caracteres"),
});

export type PostFormValues = z.infer<typeof postSchema>;
