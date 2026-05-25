import { useParams, useNavigate } from "react-router-dom";
import { usePostDetail } from "./hooks/usePostDetail";
import { PostComments } from "./components/PostComments";
import { Button } from "../../components/ui/button";

export const PostDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const postId = Number(id);

  const { data: post, isLoading, isError } = usePostDetail(postId);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400">Cargando post...</p>
      </div>
    );

  if (isError || !post)
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-400">Post no encontrado.</p>
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-6">
      {/* Botón volver */}
      <Button variant="ghost" className="w-fit -ml-2" onClick={() => navigate("/posts")}>
        ← Volver a posts
      </Button>

      {/* Card estilo Facebook */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Header del autor */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
            {post.author?.name?.charAt(0).toUpperCase() ?? "L"}
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">{post.author?.name ?? "Local"}</p>
            <p className="text-xs text-gray-400">
              @{post.author?.username ?? "local"} · Post #{post.id}
            </p>
          </div>
        </div>

        {/* Contenido del post */}
        <div className="px-6 py-5 flex flex-col gap-3">
          <h1 className="text-xl font-bold text-gray-900 leading-snug capitalize">{post.title}</h1>
          <p className="text-gray-600 leading-relaxed">{post.body}</p>
        </div>
      </div>

      {/* Comentarios */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-bold text-gray-800">Comentarios</h2>
        <PostComments postId={postId} />
      </div>
    </div>
  );
};
