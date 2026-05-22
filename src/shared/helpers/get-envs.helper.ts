export const getEnvs = () => {
  return {
    pokeApiUrl: import.meta.env.VITE_POKE_API_URL as string,
  };
};
