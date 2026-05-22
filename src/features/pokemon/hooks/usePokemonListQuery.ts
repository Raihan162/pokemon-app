"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getPokemonListPage } from "@/features/pokemon/api/pokemonApi";

export const usePokemonListQuery = (page: number, pageSize: number) =>
  useQuery({
    queryKey: ["pokemon-list", page, pageSize],
    queryFn: () => getPokemonListPage(page, pageSize),
    placeholderData: keepPreviousData,
  });
