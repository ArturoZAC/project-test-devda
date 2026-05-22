import { useParams, useNavigate } from "react-router-dom";
import { usePokemonDetail } from "./hooks/usePokemonDetail";
import { StatBar } from "./components/StatBar";

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

export const PokemonDetailPage = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const { data: pokemon, isLoading, isError } = usePokemonDetail(name!);

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 flex flex-col items-center gap-6 animate-pulse">
        <div className="w-48 h-48 bg-gray-200 rounded-full" />
        <div className="h-8 w-40 bg-gray-200 rounded-xl" />
        <div className="w-full h-4 bg-gray-200 rounded-xl" />
        <div className="w-full h-4 bg-gray-200 rounded-xl" />
        <div className="w-3/4 h-4 bg-gray-200 rounded-xl" />
      </div>
    );
  }

  if (isError || !pokemon) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center text-gray-400">
        <p className="text-5xl mb-4">⚠️</p>
        <p className="text-lg font-medium">No se pudo cargar el Pokémon</p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-5 py-2 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition"
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  const image =
    pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-red-500 transition"
      >
        ← Volver
      </button>

      <div className="bg-white rounded-3xl shadow-md p-8 flex flex-col items-center gap-6">
        {/* Image */}
        <div className="bg-gray-100 rounded-2xl w-full flex justify-center p-6">
          <img src={image} alt={pokemon.name} className="w-48 h-48 object-contain" />
        </div>

        {/* Name + ID */}
        <div className="text-center">
          <span className="text-xs text-gray-400 font-mono">
            #{String(pokemon.id).padStart(3, "0")}
          </span>
          <h1 className="text-3xl font-extrabold text-gray-800 capitalize mt-1">{pokemon.name}</h1>
        </div>

        {/* Types */}
        <div className="flex gap-2 flex-wrap justify-center">
          {pokemon.types.map(({ type }) => (
            <span
              key={type.name}
              className={`${TYPE_COLORS[type.name] ?? "bg-gray-400"} text-white text-sm font-semibold px-4 py-1 rounded-full capitalize`}
            >
              {type.name}
            </span>
          ))}
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-3 w-full gap-4 text-center">
          <div className="bg-gray-50 rounded-2xl p-4">
            <p className="text-xs text-gray-400 font-medium mb-1">Altura</p>
            <p className="text-lg font-bold text-gray-700">{pokemon.height / 10}m</p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4">
            <p className="text-xs text-gray-400 font-medium mb-1">Peso</p>
            <p className="text-lg font-bold text-gray-700">{pokemon.weight / 10}kg</p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4">
            <p className="text-xs text-gray-400 font-medium mb-1">Exp. Base</p>
            <p className="text-lg font-bold text-gray-700">{pokemon.base_experience}</p>
          </div>
        </div>

        {/* Abilities */}
        <div className="w-full">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
            Habilidades
          </h2>
          <div className="flex gap-2 flex-wrap">
            {pokemon.abilities.map(({ ability, is_hidden }) => (
              <span
                key={ability.name}
                className={`text-sm px-3 py-1 rounded-full capitalize font-medium border ${
                  is_hidden
                    ? "border-dashed border-gray-300 text-gray-400"
                    : "border-gray-200 bg-gray-50 text-gray-700"
                }`}
              >
                {ability.name}
                {is_hidden && <span className="ml-1 text-xs text-gray-400">(oculta)</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="w-full">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
            Estadísticas
          </h2>
          <div className="flex flex-col gap-3">
            {pokemon.stats.map(({ stat, base_stat }) => (
              <StatBar key={stat.name} name={stat.name} value={base_stat} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
