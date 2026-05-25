import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { commentsApi } from "../../../shared/api/comments.api";
import { queryKeys } from "../../../shared/api/query-keys";
import type { CommentFormData } from "../schema/comment.schema";

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

const STORAGE_KEY = "local_comments";
const DELETED_KEY = "deleted_comment_ids";

const getLocalComments = (): Comment[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
};

const setLocalComments = (comments: Comment[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
};

const getDeletedIds = (): number[] => {
  try {
    return JSON.parse(localStorage.getItem(DELETED_KEY) ?? "[]");
  } catch {
    return [];
  }
};

const addDeletedId = (id: number) => {
  localStorage.setItem(DELETED_KEY, JSON.stringify([...getDeletedIds(), id]));
};

// Fetch todos los comentarios (página /comments)
const fetchComments = async (): Promise<Comment[]> => {
  // const { data } = await commentsApi.get<Comment[]>("/comments?_limit=10");
  const { data } = await commentsApi.get<Comment[]>("/comments");
  const local = getLocalComments();
  const deleted = new Set(getDeletedIds());
  const remoteIds = new Set(data.map((c) => c.id));
  const uniqueLocal = local.filter((c) => !remoteIds.has(c.id));
  return [...uniqueLocal, ...data].filter((c) => !deleted.has(c.id));
};

// Fetch comentarios de un post específico
const fetchCommentsByPost = async (postId: number): Promise<Comment[]> => {
  const { data } = await commentsApi.get<Comment[]>(`/comments?postId=${postId}`);
  const local = getLocalComments().filter((c) => c.postId === postId);
  const deleted = new Set(getDeletedIds());
  const remoteIds = new Set(data.map((c) => c.id));
  const uniqueLocal = local.filter((c) => !remoteIds.has(c.id));
  return [...uniqueLocal, ...data].filter((c) => !deleted.has(c.id));
};

const postComment = async (payload: CommentFormData): Promise<Comment> => {
  const { data } = await commentsApi.post<Comment>("/comments", payload);
  const localComment: Comment = {
    ...data,
    id: Date.now(),
    postId: 1,
  };
  setLocalComments([localComment, ...getLocalComments()]);
  return localComment;
};

const postCommentByPost = async (
  payload: CommentFormData & { postId: number },
): Promise<Comment> => {
  const { data } = await commentsApi.post<Comment>("/comments", payload);
  const localComment: Comment = {
    ...data,
    id: Date.now(),
    postId: payload.postId,
  };
  setLocalComments([localComment, ...getLocalComments()]);
  return localComment;
};

// const deleteComment = async (id: number): Promise<number> => {
//   await commentsApi.delete(`/comments/${id}`);
//   setLocalComments(getLocalComments().filter((c) => c.id !== id));
//   return id;
// };

const deleteComment = async (id: number): Promise<number> => {
  try {
    await commentsApi.delete(`/comments/${id}`);
  } catch {
    // comentario local, la API no lo conoce — no importa
  }
  setLocalComments(getLocalComments().filter((c) => c.id !== id));
  addDeletedId(id); // ← agrega esto
  return id;
};

// Hook general — página /comments
export const useComments = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: queryKeys.comments.all,
    queryFn: fetchComments,
  });

  const mutation = useMutation({
    mutationFn: postComment,
    onSuccess: (newComment) => {
      queryClient.setQueryData<Comment[]>(queryKeys.comments.all, (old = []) => [
        newComment,
        ...old,
      ]);
      queryClient.invalidateQueries({
        queryKey: queryKeys.comments.byPost(newComment.postId),
      });
    },
  });

  // const deleteMutation = useMutation({
  //   mutationFn: deleteComment,
  //   onSuccess: (deletedId) => {
  //     // Sincronizar página /comments
  //     queryClient.setQueryData<Comment[]>(queryKeys.comments.all, (old = []) =>
  //       old.filter((c) => c.id !== deletedId),
  //     );
  //     // Invalidar todos los byPost por si está abierto algún detalle
  //     queryClient.invalidateQueries({ queryKey: queryKeys.comments.all });
  //   },
  // });

  const deleteMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: (deletedId) => {
      queryClient.setQueryData<Comment[]>(queryKeys.comments.all, (old = []) =>
        old.filter((c) => c.id !== deletedId),
      );
    },
  });

  return { query, mutation, deleteMutation };
};

// Hook para el detalle de un post
export const usePostComments = (postId: number) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: queryKeys.comments.byPost(postId),
    queryFn: () => fetchCommentsByPost(postId),
    enabled: !!postId,
  });

  const addMutation = useMutation({
    mutationFn: (payload: CommentFormData) => postCommentByPost({ ...payload, postId }),
    onSuccess: (newComment) => {
      // Actualizar cache del detalle
      queryClient.setQueryData<Comment[]>(queryKeys.comments.byPost(postId), (old = []) => [
        newComment,
        ...old,
      ]);
      // Sincronizar con página /comments
      queryClient.setQueryData<Comment[]>(queryKeys.comments.all, (old = []) => [
        newComment,
        ...old,
      ]);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: (deletedId) => {
      // Actualizar cache del detalle
      queryClient.setQueryData<Comment[]>(queryKeys.comments.byPost(postId), (old = []) =>
        old.filter((c) => c.id !== deletedId),
      );
      // Sincronizar con página /comments
      queryClient.setQueryData<Comment[]>(queryKeys.comments.all, (old = []) =>
        old.filter((c) => c.id !== deletedId),
      );
    },
  });

  return { query, addMutation, deleteMutation };
};
