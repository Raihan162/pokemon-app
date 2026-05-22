"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { SearchInput } from "@/shared/ui/SearchInput";
import { PokemonCard } from "@/features/pokemon/components/PokemonCard";
import { usePokemonListQuery } from "@/features/pokemon/hooks/usePokemonListQuery";
import { env } from "@/lib/env";

export default function PokedexPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = env.defaultPageSize;

  const listQuery = usePokemonListQuery(page, pageSize);

  const filteredPokemon = useMemo(() => {
    const items = listQuery.data?.items ?? [];
    const normalized = searchQuery.trim().toLowerCase();
    if (!normalized) return items;

    return items.filter((pokemon) => pokemon.name.toLowerCase().includes(normalized));
  }, [listQuery.data?.items, searchQuery]);

  const totalCount = listQuery.data?.totalCount ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300">
      <main className="max-w-7xl mx-auto px-6 py-10 md:py-16 flex flex-col gap-8 md:gap-12">
        <div className="flex flex-col gap-6">
          <Link
            href="/"
            className="group flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors w-fit font-semibold text-sm md:text-base cursor-pointer"
          >
            Back to Home
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-zinc-50 tracking-tight leading-none">
                Pokedex
              </h1>
              <p className="text-slate-400 dark:text-zinc-500 font-medium text-sm md:text-base">
                Showing {filteredPokemon.length} on page {page} of {totalPages}
              </p>
            </div>

            <SearchInput
              className="max-w-md md:w-80"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name..."
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={!hasPrev || listQuery.isFetching}
            className="px-4 py-2 text-sm font-bold rounded-full border border-slate-200 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={!hasNext || listQuery.isFetching}
            className="px-4 py-2 text-sm font-bold rounded-full border border-slate-200 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
          </button>
          {listQuery.isFetching && (
            <span className="text-xs text-slate-400 font-semibold">Updating list...</span>
          )}
        </div>

        {listQuery.isLoading ? (
          <div className="py-16 text-center text-slate-500 dark:text-zinc-400">Loading Pokemon...</div>
        ) : listQuery.isError ? (
          <div className="py-16 text-center text-red-500">Failed to load Pokemon data.</div>
        ) : filteredPokemon.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPokemon.map((pokemon) => (
              <Link key={pokemon.id} href={`/pokedex/${pokemon.id}`} className="contents cursor-pointer">
                <PokemonCard
                  pokemon={{
                    id: `#${String(pokemon.id).padStart(3, "0")}`,
                    name: pokemon.name,
                    imageUrl: pokemon.imageUrl,
                    types: pokemon.types,
                    bgClass: "bg-[#f8fafc] dark:bg-zinc-900 border-slate-100 dark:border-zinc-800",
                    darkBoxClass: "from-zinc-800 to-zinc-900",
                  }}
                />
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-slate-400 bg-slate-50/50 dark:bg-zinc-900/30 rounded-3xl border border-dashed border-slate-200 dark:border-zinc-800">
            No Pokemon found matching &quot;{searchQuery}&quot;
          </div>
        )}
      </main>
    </div>
  );
}
