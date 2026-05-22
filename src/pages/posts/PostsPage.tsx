import { useState } from "react";
import { Plus } from "lucide-react";
import { usePosts, type Post } from "./hooks/usePosts";
import { PostCard } from "./components/PostCard";
import { PostModal } from "./components/PostModal";
import type { PostFormValues } from "./schema/post.schema";
import { Button } from "../../components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../shared/api/query-keys";

export const PostsPage = () => {
  const queryClient = useQueryClient();
  const {
    posts,
    isLoading,
    isError,
    createPost,
    updatePost,
    deletePost,
    isCreating,
    isUpdating,
    isDeleting,
  } = usePosts();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | undefined>(undefined);

  const handleCreate = () => {
    setEditingPost(undefined);
    setModalOpen(true);
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setModalOpen(true);
  };

  const handleSubmit = (values: PostFormValues) => {
    if (editingPost) {
      updatePost({ ...editingPost, ...values });
    } else {
      createPost(values);
    }
    setModalOpen(false);
  };

  // const handleAssignComment = (postId: number, commentId: number) => {
  //   const stored = localStorage.getItem("crud_posts");
  //   if (stored) {
  //     const allPosts: Post[] = JSON.parse(stored);
  //     const updated = allPosts.map((p) =>
  //       p.id === postId ? { ...p, assignedCommentId: commentId } : p,
  //     );
  //     localStorage.setItem("crud_posts", JSON.stringify(updated));
  //     window.location.reload();
  //   }
  // };

  const handleAssignComment = (postId: number, commentId: number) => {
    const stored = localStorage.getItem("crud_posts");
    if (stored) {
      const allPosts: Post[] = JSON.parse(stored);
      const updated = allPosts.map((p) =>
        p.id === postId ? { ...p, assignedCommentId: commentId } : p,
      );
      localStorage.setItem("crud_posts", JSON.stringify(updated));
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.all });
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto p-6 text-center">
        <p className="text-muted-foreground animate-pulse">Cargando posts...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-5xl mx-auto p-6 text-center text-red-500">
        Error al cargar posts. Intenta recargar.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Posts CRUD</h1>
        <Button onClick={handleCreate} className="gap-2">
          <Plus className="w-4 h-4" /> Nuevo Post
        </Button>
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-muted-foreground">No hay posts aun. Crea el primero.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onEdit={handleEdit}
              onDelete={deletePost}
              onAssignComment={handleAssignComment}
              isDeleting={isDeleting}
            />
          ))}
        </div>
      )}

      <PostModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        post={editingPost}
        onSubmit={handleSubmit}
        isLoading={isCreating || isUpdating}
      />
    </div>
  );
};
