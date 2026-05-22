import axios from "axios";
import { getEnvs } from "../helpers/get-envs.helper";

const { pokeApiUrl } = getEnvs();

export const pokeApi = axios.create({
  baseURL: pokeApiUrl,
});
