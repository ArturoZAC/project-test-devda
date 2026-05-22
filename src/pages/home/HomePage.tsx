import { useState } from "react";
import { PokemonGrid } from "./components/PokemonGrid";
import { SearchBar } from "./components/SearchBar";
import { usePokemon } from "./hooks/usePokemon";

export const HomePage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data: pokemons = [], isLoading } = usePokemon(page, search);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-red-500 shadow-md py-6 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-white text-3xl font-extrabold tracking-tight">Pokédex</h1>
          <SearchBar value={search} onChange={handleSearch} />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <PokemonGrid pokemons={pokemons} isLoading={isLoading} />

        {!search && (
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-5 py-2 rounded-xl bg-white border border-gray-200 shadow-sm font-semibold text-gray-700 disabled:opacity-40 hover:bg-gray-100 transition"
            >
              ← Anterior
            </button>
            <span className="font-mono text-gray-500">Página {page}</span>
            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-5 py-2 rounded-xl bg-red-500 text-white font-semibold shadow-sm hover:bg-red-600 transition"
            >
              Siguiente →
            </button>
          </div>
        )}
      </main>
    </div>
  );
};
