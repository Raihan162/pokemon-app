"use client";

import { useQuery } from "@tanstack/react-query";
import { getPokemonDetailById } from "@/features/pokemon/api/pokemonApi";

export const usePokemonDetailQuery = (id: string) =>
  useQuery({
    queryKey: ["pokemon-detail", id],
    queryFn: () => getPokemonDetailById(id),
    enabled: Boolean(id),
  });
