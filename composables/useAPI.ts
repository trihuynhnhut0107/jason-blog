import { useRuntimeConfig } from "#app";

export function useAPI(url: string, options = {}) {
  const config = useRuntimeConfig();
  const baseURL = config.public.baseURL;
  return useFetch(`${baseURL}${url}`, options);
}
