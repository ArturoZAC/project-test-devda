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
    <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-6">Nuevo comentario</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {/* Nombre */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="name"
            className="text-xs font-semibold text-gray-500 uppercase tracking-wider"
          >
            Nombre
          </label>
          <input
            id="name"
            {...register("name")}
            placeholder="Tu nombre"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 outline-none transition-all focus:ring-2 focus:ring-indigo-400/60 focus:border-indigo-400"
          />
          {errors.name && <p className="text-xs text-red-500 mt-0.5">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="email"
            className="text-xs font-semibold text-gray-500 uppercase tracking-wider"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            placeholder="tu@email.com"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 outline-none transition-all focus:ring-2 focus:ring-indigo-400/60 focus:border-indigo-400"
          />
          {errors.email && <p className="text-xs text-red-500 mt-0.5">{errors.email.message}</p>}
        </div>

        {/* Comentario */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="body"
            className="text-xs font-semibold text-gray-500 uppercase tracking-wider"
          >
            Comentario
          </label>
          <textarea
            id="body"
            {...register("body")}
            placeholder="Escribe tu comentario..."
            rows={4}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 outline-none transition-all focus:ring-2 focus:ring-indigo-400/60 focus:border-indigo-400 resize-none"
          />
          {errors.body && <p className="text-xs text-red-500 mt-0.5">{errors.body.message}</p>}
        </div>

        {/* Botón */}
        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
        >
          {mutation.isPending ? (
            <span className="flex items-center justify-center gap-2">Enviando...</span>
          ) : (
            "Enviar comentario"
          )}
        </button>

        {/* Mensajes de estado */}
        {mutation.isSuccess && (
          <p className="text-xs text-emerald-600 text-center font-medium bg-emerald-50 py-2 rounded-lg">
            Comentario enviado correctamente
          </p>
        )}

        {mutation.isError && (
          <p className="text-xs text-red-600 text-center font-medium bg-red-50 py-2 rounded-lg">
            Hubo un error al enviar el comentario
          </p>
        )}
      </form>
    </div>
  );
};
