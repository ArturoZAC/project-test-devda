import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../layout/AppLayout";
import { HomePage } from "../pages/home/HomePage";
import { PokemonDetailPage } from "../pages/pokemon-detail/PokemonDetailPage";
import { CommentsPage } from "../pages/comments/CommentsPage";
import { PostsPage } from "../pages/posts/PostsPage";
import { PostDetailPage } from "../pages/post-detail/PostDetailPage";

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "pokemon/:name", element: <PokemonDetailPage /> },
      { path: "comments", element: <CommentsPage /> },
      { path: "posts", element: <PostsPage /> },
      { path: "posts/:id", element: <PostDetailPage /> },
    ],
  },
]);
