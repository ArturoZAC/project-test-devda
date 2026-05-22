import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { postsApi } from "../../../shared/api/posts.api";
import type { PostFormValues } from "../schema/post.schema";
import { queryKeys } from "../../../shared/api/query-keys";

export interface Post {
  id: number;
  title: string;
  body: string;
  userId?: number;
  assignedCommentId?: number | null;
}

const POSTS_KEY = "crud_posts";

const getLocalPosts = (): Post[] => {
  const raw = localStorage.getItem(POSTS_KEY);
  return raw ? JSON.parse(raw) : [];
};

const setLocalPosts = (posts: Post[]) => {
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
};

const fetchPosts = async (): Promise<Post[]> => {
  const local = getLocalPosts();
  if (local.length > 0) return local;

  const { data } = await postsApi.get<Post[]>("/posts?_limit=10");
  const merged = data.map((p) => ({ ...p, assignedCommentId: null }));
  setLocalPosts(merged);
  return merged;
};

const createPost = async (newPost: PostFormValues): Promise<Post> => {
  const { data } = await postsApi.post<Post>("/posts", newPost);
  const postWithId: Post = {
    ...data,
    id: Date.now(),
    assignedCommentId: null,
  };
  const local = getLocalPosts();
  const updated = [postWithId, ...local];
  setLocalPosts(updated);
  return postWithId;
};

const updatePost = async (updatedPost: Post): Promise<Post> => {
  await postsApi.put(`/posts/${updatedPost.id}`, updatedPost);
  const local = getLocalPosts();
  const updated = local.map((p) => (p.id === updatedPost.id ? updatedPost : p));
  setLocalPosts(updated);
  return updatedPost;
};

const deletePost = async (id: number): Promise<number> => {
  if (id % 2 === 0) {
    throw new Error("Error simulado: no se puede eliminar un post con ID par");
  }
  await postsApi.delete(`/posts/${id}`);
  const local = getLocalPosts().filter((p) => p.id !== id);
  setLocalPosts(local);
  return id;
};

export const usePosts = () => {
  const queryClient = useQueryClient();

  const postsQuery = useQuery({
    queryKey: queryKeys.posts.all,
    queryFn: fetchPosts,
    staleTime: 1000 * 60 * 5,
  });

  const createMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.all });
      toast.success("Post creado correctamente");
    },
    onError: (error: Error) => {
      toast.error(`Error al crear: ${error.message}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.all });
      toast.success("Post actualizado");
    },
    onError: (error: Error) => {
      toast.error(`Error al actualizar: ${error.message}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.all });
      toast.success("Post eliminado");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return {
    posts: postsQuery.data ?? [],
    isLoading: postsQuery.isLoading,
    isError: postsQuery.isError,
    createPost: createMutation.mutate,
    updatePost: updateMutation.mutate,
    deletePost: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};
