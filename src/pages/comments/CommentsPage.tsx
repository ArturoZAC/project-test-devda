import { CommentCard } from "./components/CommentCard";
import { CommentForm } from "./components/CommentForm";
import { useComments } from "./hooks/useComments";

export const CommentsPage = () => {
  const { query, mutation } = useComments();
  const { data: comments = [], isLoading, isError } = query;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-8">
      <CommentForm mutation={mutation} />

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">
            Comentarios recientes
          </h2>
          {comments.length > 0 && (
            <span className="text-xs text-gray-400 font-mono">{comments.length} comentarios</span>
          )}
        </div>

        {isLoading && (
          <div className="flex flex-col gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-2 animate-pulse"
              >
                <div className="h-3 bg-gray-200 rounded w-1/3" />
                <div className="h-2 bg-gray-200 rounded w-1/4" />
                <div className="h-2 bg-gray-200 rounded w-full" />
                <div className="h-2 bg-gray-200 rounded w-5/6" />
              </div>
            ))}
          </div>
        )}

        {isError && (
          <p className="text-center text-gray-400 py-10">
            ❌ No se pudieron cargar los comentarios
          </p>
        )}

        {!isLoading && !isError && (
          <div className="flex flex-col gap-3">
            {comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
