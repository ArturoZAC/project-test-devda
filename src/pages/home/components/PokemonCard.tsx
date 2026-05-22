import type { Pokemon } from "../../../shared/interfaces/pokemon.interface";

const TYPE_COLORS: Record<string, string> = {
  fire: "bg-orange-500",
  water: "bg-blue-500",
  grass: "bg-green-500",
  electric: "bg-yellow-400",
  psychic: "bg-pink-500",
  ice: "bg-cyan-400",
  dragon: "bg-indigo-600",
  dark: "bg-gray-800",
  fairy: "bg-pink-300",
  normal: "bg-gray-400",
  fighting: "bg-red-700",
  flying: "bg-sky-400",
  poison: "bg-purple-500",
  ground: "bg-yellow-600",
  rock: "bg-yellow-800",
  bug: "bg-lime-500",
  ghost: "bg-purple-800",
  steel: "bg-slate-500",
};

interface Props {
  pokemon: Pokemon;
}

export const PokemonCard = ({ pokemon }: Props) => {
  const image =
    pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default;

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-4 flex flex-col items-center gap-3 cursor-pointer group">
      <div className="bg-gray-100 rounded-xl w-full flex justify-center p-4 group-hover:scale-105 transition-transform duration-300">
        <img src={image} alt={pokemon.name} className="w-28 h-28 object-contain" />
      </div>
      <span className="text-xs text-gray-400 font-mono">
        #{String(pokemon.id).padStart(3, "0")}
      </span>
      <h3 className="font-bold text-gray-800 capitalize text-lg">{pokemon.name}</h3>
      <div className="flex gap-2 flex-wrap justify-center">
        {pokemon.types.map(({ type }) => (
          <span
            key={type.name}
            className={`${TYPE_COLORS[type.name] ?? "bg-gray-400"} text-white text-xs font-semibold px-3 py-1 rounded-full capitalize`}
          >
            {type.name}
          </span>
        ))}
      </div>
    </div>
  );
};
