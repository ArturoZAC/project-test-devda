import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema, type CommentFormData } from "../schema/comment.schema";
import type { UseMutationResult } from "@tanstack/react-query";
import type { Comment } from "../hooks/useComments";

interface Props {
  mutation: UseMutationResult<Comment, Error, CommentFormData>;
}

export const CommentForm = ({ mutation }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
  });

  const onSubmit = (data: CommentFormData) => {
    mutation.mutate(data, { onSuccess: () => reset() });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-extrabold text-gray-800 mb-5">Nuevo comentario</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Name */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Nombre
          </label>
          <input
            {...register("name")}
            placeholder="Tu nombre"
            className="border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-red-400 transition"
          />
          {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Email
          </label>
          <input
            {...register("email")}
            placeholder="tu@email.com"
            className="border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-red-400 transition"
          />
          {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
        </div>

        {/* Body */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Comentario
          </label>
          <textarea
            {...register("body")}
            placeholder="Escribe tu comentario..."
            rows={4}
            className="border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-red-400 transition resize-none"
          />
          {errors.body && <p className="text-xs text-red-500">{errors.body.message}</p>}
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-semibold py-2 rounded-xl transition"
        >
          {mutation.isPending ? "Enviando..." : "Enviar comentario"}
        </button>

        {mutation.isSuccess && (
          <p className="text-xs text-green-500 text-center font-medium">
            ✅ Comentario enviado correctamente
          </p>
        )}

        {mutation.isError && (
          <p className="text-xs text-red-500 text-center font-medium">
            ❌ Hubo un error al enviar el comentario
          </p>
        )}
      </form>
    </div>
  );
};
