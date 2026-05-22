import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { PokemonDetail } from "../../../shared/interfaces/pokemon.interface";

const fetchPokemonDetail = async (name: string): Promise<PokemonDetail> => {
  const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return data;
};

export const usePokemonDetail = (name: string) => {
  return useQuery({
    queryKey: ["pokemon", name],
    queryFn: () => fetchPokemonDetail(name),
    enabled: !!name,
  });
};
