import { AddCommentForm } from "./AddCommentForm";
import type { CommentFormData } from "../../comments/schema/comment.schema";
import { Button } from "../../../components/ui/button";
import { usePostComments } from "../../comments/hooks/useComments";

interface Props {
  postId: number;
}

const isLocal = (id: number) => id > 500;

export const PostComments = ({ postId }: Props) => {
  const { query, addMutation, deleteMutation } = usePostComments(postId);

  const handleAdd = (data: CommentFormData) => {
    addMutation.mutate(data);
  };

  if (query.isLoading) return <p className="text-sm text-gray-400">Cargando comentarios...</p>;
  if (query.isError) return <p className="text-sm text-red-400">Error al cargar comentarios</p>;

  const comments = query.data ?? [];

  return (
    <div className="flex flex-col gap-6">
      {/* Formulario */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
        <h3 className="font-semibold text-gray-700 mb-4">Agregar comentario</h3>
        <AddCommentForm onSubmit={handleAdd} isSubmitting={addMutation.isPending} />
      </div>

      {/* Lista de comentarios */}
      <div className="flex flex-col gap-3">
        <h3 className="font-semibold text-gray-700">
          {comments.length} comentario{comments.length !== 1 ? "s" : ""}
        </h3>

        {comments.length === 0 && (
          <p className="text-sm text-gray-400">Aún no hay comentarios en este post.</p>
        )}

        {comments.map((comment) => (
          <div
            key={comment.id}
            className="relative bg-white rounded-2xl border border-gray-200 p-4 pl-4 flex flex-col gap-2 before:absolute before:left-0 before:top-4 before:bottom-4 before:w-[3px] before:rounded-full before:bg-indigo-400/50"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold text-gray-800 capitalize">
                  {comment.name}
                </span>
                <span className="text-xs text-gray-400">{comment.email}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {isLocal(comment.id) && (
                  <span className="text-[11px] bg-emerald-50 text-emerald-700 font-medium px-2.5 py-0.5 rounded-full border border-emerald-200/70">
                    Local
                  </span>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-red-400 hover:text-red-600 hover:bg-red-50 h-7 px-2"
                  onClick={() => deleteMutation.mutate(comment.id)}
                  disabled={deleteMutation.isPending}
                >
                  Eliminar
                </Button>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{comment.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
