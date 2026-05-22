/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { AssignCommentModal } from "./AssignCommentModal";
import type { Post } from "../hooks/usePosts";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

interface PostCardProps {
  post: Post;
  onEdit: (post: Post) => void;
  onDelete: (id: number) => void;
  onAssignComment: (postId: number, commentId: number) => void;
  isDeleting?: boolean;
}

export const PostCard = ({
  post,
  onEdit,
  onDelete,
  onAssignComment,
  isDeleting,
}: PostCardProps) => {
  const [assignOpen, setAssignOpen] = useState(false);

  // Obtener el comentario asignado desde localStorage
  const assignedComment = (() => {
    if (!post.assignedCommentId) return null;
    const stored = localStorage.getItem("local_comments");
    if (!stored) return null;
    const comments = JSON.parse(stored);
    return comments.find((c: any) => c.id === post.assignedCommentId) || null;
  })();

  return (
    <>
      <Card className="group flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-200/80 bg-white rounded-2xl overflow-hidden">
        <CardHeader className="pb-3 pt-5 px-5 bg-gradient-to-b from-gray-50/50 to-white">
          <CardTitle className="text-lg font-bold leading-tight line-clamp-2 text-gray-800 group-hover:text-blue-600 transition-colors">
            {post.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="px-5 pb-2 flex-1">
          <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed">{post.body}</p>

          {assignedComment && (
            <div className="mt-4 p-3 bg-blue-50/70 border border-blue-100 rounded-xl">
              <div className="flex items-start gap-2">
                <div className="mt-0.5 text-blue-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-blue-800">{assignedComment.name}</p>
                  <p className="text-xs text-blue-600/80 mt-0.5 line-clamp-2">
                    {assignedComment.body}
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="px-5 pb-5 pt-3 flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="outline"
            className="flex-1 min-w-[100px] border-gray-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors"
            onClick={() => setAssignOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1.5"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Comentar
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

      <AssignCommentModal
        open={assignOpen}
        onOpenChange={setAssignOpen}
        currentCommentId={post.assignedCommentId}
        onAssign={(commentId) => {
          onAssignComment(post.id, commentId);
          setAssignOpen(false);
        }}
      />
    </>
  );
};
