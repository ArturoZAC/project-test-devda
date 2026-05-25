import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { postsApi } from "../../../shared/api/posts.api";
import { usersApi } from "../../../shared/api/users.api";
import type { PostFormValues } from "../schema/post.schema";
import type { User } from "../../../shared/interfaces/user.interface";
import type { Comment } from "../../comments/hooks/useComments";
import { queryKeys } from "../../../shared/api/query-keys";

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  assignedCommentId?: number | null;
  author?: User;
}

const POSTS_KEY = "crud_posts";
const USERS_KEY = "crud_users";
const COMMENTS_KEY = "local_comments";

const getLocalPosts = (): Post[] => {
  try {
    return JSON.parse(localStorage.getItem(POSTS_KEY) ?? "[]");
  } catch {
    return [];
  }
};

const setLocalPosts = (posts: Post[]) => {
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
};

const getLocalUsers = (): User[] => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) ?? "[]");
  } catch {
    return [];
  }
};

const setLocalUsers = (users: User[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const getLocalComments = (): Comment[] => {
  try {
    return JSON.parse(localStorage.getItem(COMMENTS_KEY) ?? "[]");
  } catch {
    return [];
  }
};

const setLocalComments = (comments: Comment[]) => {
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
};

const fetchUsers = async (): Promise<User[]> => {
  const local = getLocalUsers();
  if (local.length > 0) return local;
  const { data } = await usersApi.get<User[]>("/users");
  setLocalUsers(data);
  return data;
};

const AZACODE_AUTHOR = {
  id: 1,
  name: "AZACODE",
  username: "azacode",
  email: "admin@azacode.dev",
};

const fetchPosts = async (): Promise<Post[]> => {
  const users = await fetchUsers();
  const local = getLocalPosts();

  if (local.length > 0) {
    return local.map((p) => ({
      ...p,
      author:
        p.author?.email === "admin@azacode.dev"
          ? AZACODE_AUTHOR
          : users.find((u) => u.id === p.userId),
    }));
  }

  const { data } = await postsApi.get<Post[]>("/posts");
  const merged = data.map((p) => ({
    ...p,
    assignedCommentId: null,
    author: users.find((u) => u.id === p.userId),
  }));
  setLocalPosts(merged);
  return merged;
};

// const fetchPosts = async (): Promise<Post[]> => {
//   const users = await fetchUsers();
//   const local = getLocalPosts();

//   if (local.length > 0) {
//     return local.map((p) => ({
//       ...p,
//       author: users.find((u) => u.id === p.userId),
//     }));
//   }

//   const { data } = await postsApi.get<Post[]>("/posts?_limit=10");
//   const merged = data.map((p) => ({
//     ...p,
//     assignedCommentId: null,
//     author: users.find((u) => u.id === p.userId),
//   }));
//   setLocalPosts(merged);
//   return merged;
// };

const createPost = async (newPost: PostFormValues): Promise<Post> => {
  const { data } = await postsApi.post<Post>("/posts", newPost);
  // const users = getLocalUsers();
  // const postWithId: Post = {
  //   ...data,
  //   id: Date.now(),
  //   userId: 1,
  //   assignedCommentId: null,
  //   author: users.find((u) => u.id === 1) ?? {
  //     id: 1,
  //     name: "Usuario Local",
  //     username: "local",
  //     email: "local@example.com",
  //   },
  // };

  const postWithId: Post = {
    ...data,
    id: Date.now(),
    userId: 1,
    assignedCommentId: null,
    author: {
      id: 1,
      name: "AZACODE",
      username: "azacode",
      email: "admin@azacode.dev",
    },
  };
  setLocalPosts([postWithId, ...getLocalPosts()]);
  return postWithId;
};

const updatePost = async (updatedPost: Post): Promise<Post> => {
  await postsApi.put(`/posts/${updatedPost.id}`, updatedPost);
  const users = getLocalUsers();
  const updated = getLocalPosts().map((p) =>
    p.id === updatedPost.id
      ? { ...updatedPost, author: users.find((u) => u.id === updatedPost.userId) }
      : p,
  );
  setLocalPosts(updated);
  return updatedPost;
};

const deletePost = async (id: number): Promise<number> => {
  await postsApi.delete(`/posts/${id}`);
  setLocalPosts(getLocalPosts().filter((p) => p.id !== id));
  setLocalComments(getLocalComments().filter((c) => c.postId !== id));
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
    onError: (error: Error) => toast.error(`Error al crear: ${error.message}`),
  });

  const updateMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.all });
      toast.success("Post actualizado");
    },
    onError: (error: Error) => toast.error(`Error al actualizar: ${error.message}`),
  });

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: (deletedId) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.comments.all });
      queryClient.removeQueries({ queryKey: queryKeys.posts.detail(deletedId) });
      toast.success("Post y sus comentarios eliminados");
    },
    onError: (error: Error) => toast.error(error.message),
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
