import { mapPokemonDetail, mapPokemonListItem } from "@/features/pokemon/mappers/pokemonMapper";
import { PokemonApiResponse, PokemonListPage, PokemonListResponse } from "@/features/pokemon/types";
import { env } from "@/lib/env";

const fetchJson = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
};

export const getPokemonListPage = async (page: number, pageSize: number): Promise<PokemonListPage> => {
  const safePage = Math.max(1, page);
  const safePageSize = Math.max(1, pageSize);
  const offset = (safePage - 1) * safePageSize;

  const listData = await fetchJson<PokemonListResponse>(
    `${env.pokeApiBaseUrl}/pokemon?offset=${offset}&limit=${safePageSize}`
  );

  return {
    items: listData.results.map(mapPokemonListItem),
    totalCount: listData.count,
  };
};

export const getPokemonDetailById = async (id: string) => {
  const detail = await fetchJson<PokemonApiResponse>(`${env.pokeApiBaseUrl}/pokemon/${id}`);
  return mapPokemonDetail(detail);
};
