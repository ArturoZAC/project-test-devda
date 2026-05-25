import { useNavigate } from "react-router-dom";
import type { Post } from "../hooks/usePosts";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

interface PostCardProps {
  post: Post;
  onEdit: (post: Post) => void;
  onDelete: (id: number) => void;
  onAssignComment?: (postId: number, commentId: number) => void;
  isDeleting?: boolean;
}

export const PostCard = ({ post, onEdit, onDelete, isDeleting }: PostCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="group flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-200/80 bg-white rounded-2xl overflow-hidden">
      <CardHeader className="pb-2 pt-5 px-5">
        {/* Autor arriba */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-xs shrink-0">
            {post.author?.name?.charAt(0).toUpperCase() ?? "L"}
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-700">{post.author?.name ?? "Local"}</p>
            <p className="text-[11px] text-gray-400">@{post.author?.username ?? "local"}</p>
          </div>
        </div>

        <CardTitle className="text-lg font-bold leading-tight line-clamp-2 text-gray-800 group-hover:text-blue-600 transition-colors">
          {post.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="px-5 pb-2 flex-1">
        <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed">{post.body}</p>
      </CardContent>

      <CardFooter className="px-5 pb-5 pt-3 flex flex-wrap gap-2">
        <Button
          size="sm"
          variant="outline"
          className="flex-1 min-w-[100px] hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors"
          onClick={() => navigate(`/posts/${post.id}`)}
        >
          Ver detalle
        </Button>
        <Button
          size="sm"
          variant="secondary"
          className="flex-1 min-w-[80px]"
          onClick={() => onEdit(post)}
        >
          Editar
        </Button>
        <Button
          size="sm"
          variant="destructive"
          className="flex-1 min-w-[80px]"
          onClick={() => onDelete(post.id)}
          disabled={isDeleting}
        >
          {isDeleting ? "Eliminando..." : "Eliminar"}
        </Button>
      </CardFooter>
    </Card>
  );
};
