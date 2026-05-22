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

const getLocalComments = (): Comment[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
};

const saveLocalComment = (comment: Comment): void => {
  const current = getLocalComments();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([comment, ...current]));
};

const fetchComments = async (): Promise<Comment[]> => {
  const { data } = await commentsApi.get<Comment[]>("/comments?_limit=10");
  const local = getLocalComments();
  const remoteIds = new Set(data.map((c) => c.id));
  const uniqueLocal = local.filter((c) => !remoteIds.has(c.id));
  return [...uniqueLocal, ...data];
};

const postComment = async (payload: CommentFormData): Promise<Comment> => {
  const { data } = await commentsApi.post<Comment>("/comments", {
    ...payload,
    postId: 1,
  });
  const localComment: Comment = {
    ...data,
    id: Date.now(),
  };
  saveLocalComment(localComment);
  return localComment;
};

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
    },
  });

  return { query, mutation };
};
