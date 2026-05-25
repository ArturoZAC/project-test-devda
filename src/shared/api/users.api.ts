import axios from "axios";
import { getEnvs } from "../helpers/get-envs.helper";

const { jsonPlaceholderUrl } = getEnvs();

export const usersApi = axios.create({
  baseURL: jsonPlaceholderUrl,
});
