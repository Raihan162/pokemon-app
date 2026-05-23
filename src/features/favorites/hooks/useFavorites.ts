"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FavoriteEntry, FavoriteFormValues } from "@/features/favorites/types";
import { readFavorites, writeFavorites } from "@/features/favorites/storage/favoritesStorage";

export const FAVORITES_QUERY_KEY = ["favorites", "v2"] as const;

export const useFavorites = () => {
  const queryClient = useQueryClient();

  const favoritesQuery = useQuery({
    queryKey: FAVORITES_QUERY_KEY,
    queryFn: readFavorites,
    staleTime: Number.POSITIVE_INFINITY,
  });

  const favorites = favoritesQuery.data ?? [];

  const addFavorite = (pokemonId: number, pokemonName: string, values: FavoriteFormValues) => {
    const nextEntry: FavoriteEntry = {
      pokemonId,
      pokemonName,
      nickname: values.nickname.trim(),
      collectionType: values.collectionType,
      description: values.description.trim(),
    };

    queryClient.setQueryData<FavoriteEntry[]>(FAVORITES_QUERY_KEY, (prev = []) => {
      const nextFavorites = [nextEntry, ...prev];
      writeFavorites(nextFavorites);
      return nextFavorites;
    });
  };

  const removeFavoriteAtIndex = (index: number) => {
    queryClient.setQueryData<FavoriteEntry[]>(FAVORITES_QUERY_KEY, (prev = []) => {
      const nextFavorites = prev.filter((_, favoriteIndex) => favoriteIndex !== index);
      writeFavorites(nextFavorites);
      return nextFavorites;
    });
  };

  return {
    favorites,
    addFavorite,
    removeFavoriteAtIndex,
    isLoading: favoritesQuery.isLoading,
  };
};
