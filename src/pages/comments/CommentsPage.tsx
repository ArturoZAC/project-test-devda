import { useState } from "react";
import { CommentCard } from "./components/CommentCard";
import { CommentForm } from "./components/CommentForm";
import { useComments } from "./hooks/useComments";
import { IconMessage, IconUsers, IconExclamationCircle } from "@tabler/icons-react";

export const CommentsPage = () => {
  // const { query, mutation, deleteMutation } = useComments();
  // const { data: comments = [], isLoading, isError } = query;

  const { query, mutation, deleteMutation } = useComments();
  const { data: comments = [], isLoading, isError } = query;
  const [page, setPage] = useState(1);
  const COMMENTS_PER_PAGE = 6;
  const paginatedComments = comments.slice(
    (page - 1) * COMMENTS_PER_PAGE,
    page * COMMENTS_PER_PAGE,
  );
  const totalPages = Math.ceil(comments.length / COMMENTS_PER_PAGE);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col gap-8">
      {/* Encabezado */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-indigo-100 rounded-xl shadow-sm">
          <IconMessage size={24} className="text-indigo-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Comentarios</h1>
          <p className="text-sm text-gray-500">Comparte tu opinión y lee lo que otros dicen</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Formulario */}
        <div className="lg:col-span-5 order-1 lg:order-1">
          <CommentForm mutation={mutation} />
        </div>

        {/* Lista */}
        <div className="lg:col-span-7 order-2 lg:order-2 flex flex-col gap-6">
          {/* Barra de estado */}
          <div className="flex items-center justify-between bg-white rounded-xl border border-gray-200/80 p-3 shadow-sm">
            <div className="flex items-center gap-2">
              <IconUsers size={18} className="text-gray-500" />
              <h2 className="text-sm font-bold text-gray-600 uppercase tracking-wider">
                Recientes
              </h2>
            </div>
            {!isLoading && !isError && comments.length > 0 && (
              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {comments.length} {comments.length === 1 ? "comentario" : "comentarios"}
              </span>
            )}
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-gray-200/80 p-5 flex flex-col gap-3 animate-pulse"
                >
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                  <div className="h-3 bg-gray-200 rounded w-1/4" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-5/6" />
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {isError && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center flex flex-col items-center gap-2">
              <IconExclamationCircle size={24} className="text-red-400" />
              <p className="text-sm text-red-600 font-medium">
                No se pudieron cargar los comentarios
              </p>
              <p className="text-xs text-red-500">Verifica tu conexión e intenta nuevamente</p>
              <button
                onClick={() => query.refetch()}
                className="mt-2 text-sm font-medium text-red-700 bg-red-100 hover:bg-red-200 px-4 py-1.5 rounded-lg transition-colors"
              >
                Reintentar
              </button>
            </div>
          )}

          {/* Vacío */}
          {!isLoading && !isError && comments.length === 0 && (
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 text-center flex flex-col items-center gap-2">
              <IconMessage size={24} className="text-gray-400" />
              <p className="text-sm text-gray-500">No hay comentarios aún</p>
              <p className="text-xs text-gray-400">¡Sé el primero en compartir tu opinión!</p>
            </div>
          )}

          {/* Grid */}
          {/* {!isLoading && !isError && comments.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {comments.map((comment) => (
                <CommentCard
                  key={comment.id}
                  comment={comment}
                  onDelete={(id) => deleteMutation.mutate(id)}
                  isDeleting={deleteMutation.isPending}
                />
              ))}
            </div>
          )} */}

          {!isLoading && !isError && comments.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {paginatedComments.map((comment) => (
                  <CommentCard
                    key={comment.id}
                    comment={comment}
                    onDelete={(id) => deleteMutation.mutate(id)}
                    isDeleting={deleteMutation.isPending}
                  />
                ))}
              </div>
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-4">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-5 py-2 rounded-xl bg-white border border-gray-200 shadow-sm font-semibold text-gray-700 disabled:opacity-40 hover:bg-gray-100 transition"
                  >
                    ← Anterior
                  </button>
                  <span className="font-mono text-gray-500">
                    Página {page} de {totalPages}
                  </span>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-5 py-2 rounded-xl bg-indigo-500 text-white font-semibold shadow-sm hover:bg-indigo-600 transition disabled:opacity-40"
                  >
                    Siguiente →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
