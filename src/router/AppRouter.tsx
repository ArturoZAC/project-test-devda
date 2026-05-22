import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../layout/AppLayout";
import { HomePage } from "../pages/home/HomePage";
import { PokemonDetailPage } from "../pages/pokemon-detail/PokemonDetailPage";
import { CommentsPage } from "../pages/comments/CommentsPage";

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "pokemon/:name", element: <PokemonDetailPage /> },
      { path: "comments", element: <CommentsPage /> },
    ],
  },
]);
