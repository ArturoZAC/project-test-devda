import type { Pokemon } from "../../../shared/interfaces/pokemon.interface";
import { PokemonCard } from "./PokemonCard";
import { PokemonSkeleton } from "./PokemonSkeleton";

interface Props {
  pokemons: Pokemon[];
  isLoading: boolean;
}

export const PokemonGrid = ({ pokemons, isLoading }: Props) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <PokemonSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (pokemons.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400">
        <p className="text-5xl mb-4">🔍</p>
        <p className="text-lg font-medium">No se encontró ningún Pokémon</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
};
