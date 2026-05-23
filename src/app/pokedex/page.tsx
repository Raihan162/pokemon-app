'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { SearchInput } from '@/shared/ui/SearchInput';
import { PokemonCard } from '@/features/pokemon/components/PokemonCard';
import { usePokemonListQuery } from '@/features/pokemon/hooks/usePokemonListQuery';
import { useFavorites } from '@/features/favorites/hooks/useFavorites';
import { env } from '@/lib/env';
import { TextLink } from '@/shared/ui/TextLink';
import { SecondaryButton } from '@/shared/ui/SecondaryButton';
import { Loader } from '@/shared/ui/Loader';

export default function PokedexPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = env.defaultPageSize;
  const fullSearchPageSize = 2000;
  const keyword = searchQuery.trim();
  const isSearching = keyword.length > 0;
  const activePage = isSearching ? 1 : page;
  const activePageSize = isSearching ? fullSearchPageSize : pageSize;

  const listQuery = usePokemonListQuery(activePage, activePageSize);
  const { favorites } = useFavorites();

  const collectionCountByPokemonId = useMemo(() => {
    return favorites.reduce<Record<number, number>>((accumulator, entry) => {
      accumulator[entry.pokemonId] = (accumulator[entry.pokemonId] ?? 0) + 1;
      return accumulator;
    }, {});
  }, [favorites]);

  const filteredPokemon = useMemo(() => {
    const items = listQuery.data?.items ?? [];
    if (!keyword) return items;
    return items.filter((pokemon) => pokemon.name.includes(keyword));
  }, [keyword, listQuery.data?.items]);

  const totalCount = isSearching
    ? filteredPokemon.length
    : (listQuery.data?.totalCount ?? 0);
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const hasPrev = !isSearching && page > 1;
  const hasNext = !isSearching && page < totalPages;
  const isInitialLoading = listQuery.isLoading && !listQuery.data;
  const isBackgroundFetching = listQuery.isFetching && !isInitialLoading;

  return (
    <div className='min-h-screen bg-surface transition-colors duration-300'>
      <main className='max-w-7xl mx-auto px-6 py-10 md:py-16 flex flex-col gap-8 md:gap-12'>
        <div className='flex flex-col gap-6'>
          <div className='flex items-center justify-between'>
            <TextLink href='/' className='group flex items-center gap-2 w-fit'>
              Back to Home
            </TextLink>
            <TextLink href='/collection'>View Collection</TextLink>
          </div>

          <div className='flex flex-col md:flex-row md:items-end justify-between gap-6'>
            <div className='flex flex-col gap-2'>
              <h1 className='text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight leading-none'>
                Pokedex
              </h1>
              <p className='text-on-surface-variant font-medium text-sm md:text-base'>
                {isSearching
                  ? `Showing ${filteredPokemon.length} search result${filteredPokemon.length === 1 ? '' : 's'}`
                  : `Showing ${filteredPokemon.length} on page ${page} of ${totalPages}`}
              </p>
            </div>

            <SearchInput
              className='max-w-md md:w-80'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search by name...'
            />
          </div>
        </div>

        <div className='flex items-center gap-3'>
          <SecondaryButton
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={!hasPrev || listQuery.isFetching}
            className='rounded-full disabled:opacity-40 disabled:cursor-not-allowed'
          >
            Previous
          </SecondaryButton>
          <SecondaryButton
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={!hasNext || listQuery.isFetching}
            className='rounded-full disabled:opacity-40 disabled:cursor-not-allowed'
          >
            Next
          </SecondaryButton>
          {isBackgroundFetching && (
            <span className='text-xs text-on-surface-variant font-semibold'>
              Updating list...
            </span>
          )}
        </div>

        {isBackgroundFetching || isInitialLoading ? (
          <div className='py-20 flex items-center justify-center'>
            <Loader />
          </div>
        ) : listQuery.isError ? (
          <div className='py-16 text-center text-on-error bg-error rounded-xl'>
            Failed to load Pokemon data.
          </div>
        ) : filteredPokemon.length > 0 ? (
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {filteredPokemon.map((pokemon) => (
              <Link
                key={pokemon.id}
                href={`/pokedex/${pokemon.id}`}
                className='contents cursor-pointer'
              >
                <PokemonCard
                  pokemon={{
                    id: `#${String(pokemon.id).padStart(3, '0')}`,
                    name: pokemon.name,
                    imageUrl: pokemon.imageUrl,
                    types: pokemon.types,
                    collectionCount:
                      collectionCountByPokemonId[pokemon.id] ?? 0,
                    bgClass:
                      'bg-surface-container-low border-outline-variant/30',
                    darkBoxClass: 'from-zinc-800 to-zinc-900',
                  }}
                />
              </Link>
            ))}
          </div>
        ) : (
          <div className='py-20 text-center text-on-surface-variant bg-surface-container-low rounded-3xl border border-dashed border-outline-variant'>
            No Pokemon found matching &quot;{searchQuery}&quot;
          </div>
        )}
      </main>
    </div>
  );
}
