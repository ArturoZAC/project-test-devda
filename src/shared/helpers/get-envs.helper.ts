export const getEnvs = () => {
  return {
    pokeApiUrl: import.meta.env.VITE_POKE_API_URL as string,
    jsonPlaceholderUrl: import.meta.env.VITE_JSON_PLACEHOLDER_URL as string,
  };
};
