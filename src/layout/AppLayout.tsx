import { NavLink, Outlet } from "react-router-dom";

export const AppLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-red-500 shadow-md px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex gap-4">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `text-sm font-semibold px-4 py-2 rounded-xl transition ${
                  isActive ? "bg-white text-red-500" : "text-white hover:bg-red-400"
                }`
              }
            >
              Pokémon
            </NavLink>
            <NavLink
              to="/comments"
              className={({ isActive }) =>
                `text-sm font-semibold px-4 py-2 rounded-xl transition ${
                  isActive ? "bg-white text-red-500" : "text-white hover:bg-red-400"
                }`
              }
            >
              Comments
            </NavLink>
          </div>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
