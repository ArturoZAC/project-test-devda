import { useEffect, useState } from "react";
import { PokemonGrid } from "./components/PokemonGrid";
import { SearchBar } from "./components/SearchBar";
import { usePokemon } from "./hooks/usePokemon";

export const HomePage = () => {
  const [page, setPage] = useState(1);
  // const [search, setSearch] = useState("");

  // const { data: pokemons = [], isLoading } = usePokemon(page, search);

  // const handleSearch = (value: string) => {
  //   setSearch(value);
  //   setPage(1);
  // };

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const { data: pokemons = [], isLoading } = usePokemon(page, debouncedSearch);

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex justify-center mb-6">
        <SearchBar value={search} onChange={handleSearch} />
      </div>

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
    </div>
  );
};
