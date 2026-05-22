"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FavoriteEntry, FavoriteFormValues } from "@/features/favorites/types";

export const FAVORITES_QUERY_KEY = ["favorites"] as const;

export const useFavorites = () => {
  const queryClient = useQueryClient();

  const favoritesQuery = useQuery({
    queryKey: FAVORITES_QUERY_KEY,
    queryFn: () => [] as FavoriteEntry[],
    staleTime: Number.POSITIVE_INFINITY,
  });

  const favorites = favoritesQuery.data ?? [];

  const upsertFavorite = (pokemonId: number, pokemonName: string, values: FavoriteFormValues) => {
    const nextEntry: FavoriteEntry = {
      pokemonId,
      pokemonName,
      nickname: values.nickname.trim(),
      collectionType: values.collectionType,
      description: values.description.trim() || undefined,
      createdAt: new Date().toISOString(),
    };

    queryClient.setQueryData<FavoriteEntry[]>(FAVORITES_QUERY_KEY, (prev = []) => {
      const withoutCurrent = prev.filter((item) => item.pokemonId !== pokemonId);
      return [nextEntry, ...withoutCurrent];
    });
  };

  const getByPokemonId = (pokemonId: number) =>
    favorites.find((entry) => entry.pokemonId === pokemonId);

  return {
    favorites,
    upsertFavorite,
    getByPokemonId,
    isLoading: favoritesQuery.isLoading,
  };
};
