import { z } from "zod";

export const commentSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede superar los 50 caracteres"),
  email: z.string().min(1, "El email es requerido").email("Ingresa un email válido"),
  body: z
    .string()
    .min(10, "El comentario debe tener al menos 10 caracteres")
    .max(300, "El comentario no puede superar los 300 caracteres"),
});

export type CommentFormData = z.infer<typeof commentSchema>;
