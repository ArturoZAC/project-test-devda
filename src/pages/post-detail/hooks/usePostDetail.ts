import { useQuery } from "@tanstack/react-query";
import { postsApi } from "../../../shared/api/posts.api";
import { queryKeys } from "../../../shared/api/query-keys";
import type { Post } from "../../posts/hooks/usePosts";

const fetchPostDetail = async (id: number): Promise<Post> => {
  // Primero buscar en localStorage
  const local = JSON.parse(localStorage.getItem("crud_posts") ?? "[]") as Post[];
  const found = local.find((p) => p.id === id);
  if (found) return found;

  // Si no está en local, fetch a la API
  const { data } = await postsApi.get<Post>(`/posts/${id}`);
  return data;
};

export const usePostDetail = (id: number) => {
  return useQuery({
    queryKey: queryKeys.posts.detail(id),
    queryFn: () => fetchPostDetail(id),
    enabled: !!id,
  });
};
