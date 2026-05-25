import { useQuery } from "@tanstack/react-query";
import { pokeApi } from "../../../shared/api/poke.api";
import { queryKeys } from "../../../shared/api/query-keys";
import { getEnvs } from "../../../shared/helpers/get-envs.helper";
import type { Pokemon, PokemonListResponse } from "../../../shared/interfaces/pokemon.interface";

const LIMIT = 12;
const { pokeApiUrl } = getEnvs();

const fetchAllNames = async (): Promise<{ name: string; url: string }[]> => {
  const { data } = await pokeApi.get<PokemonListResponse>(`/pokemon?limit=10000&offset=0`);
  return data.results;
};

const fetchPokemonList = async (page: number, search: string): Promise<Pokemon[]> => {
  if (search.trim()) {
    const all = await fetchAllNames();
    const filtered = all
      .filter((p) => p.name.includes(search.toLowerCase().trim()))
      .slice(0, LIMIT);

    const pokemons = await Promise.all(filtered.map(({ url }) => fetchByUrl<Pokemon>(url)));
    return pokemons;
  }

  const offset = (page - 1) * LIMIT;
  const { data: list } = await pokeApi.get<PokemonListResponse>(
    `/pokemon?limit=${LIMIT}&offset=${offset}`,
  );

  const pokemons = await Promise.all(list.results.map(({ url }) => fetchByUrl<Pokemon>(url)));
  return pokemons;
};

// const fetchPokemonList = async (page: number, search: string): Promise<Pokemon[]> => {
//   if (search.trim()) {
//     const { data } = await pokeApi.get<Pokemon>(`/pokemon/${search.toLowerCase().trim()}`);
//     return [data];
//   }

//   const offset = (page - 1) * LIMIT;
//   const { data: list } = await pokeApi.get<PokemonListResponse>(
//     `/pokemon?limit=${LIMIT}&offset=${offset}`,
//   );

//   const pokemons = await Promise.all(list.results.map(({ url }) => fetchByUrl<Pokemon>(url)));

//   return pokemons;
// };

const fetchByUrl = async <T>(url: string): Promise<T> => {
  const { data } = await pokeApi.get<T>(url.replace(pokeApiUrl, ""));
  return data;
};

export const usePokemon = (page: number, search: string) => {
  return useQuery({
    queryKey: queryKeys.pokemon.list(page, search),
    queryFn: () => fetchPokemonList(page, search),
  });
};
