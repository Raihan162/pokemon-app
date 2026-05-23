'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SearchInput } from '@/shared/ui/SearchInput';
import { TextLink } from '@/shared/ui/TextLink';
import { NewsCard } from '@/shared/ui/NewsCard';
import { CategoryCardContent } from '@/features/home/components/CategoryCardContent';
import { Category, NewsItem } from '@/features/home/types';

const CATEGORIES: Category[] = [
  {
    id: 'pokedex',
    name: 'Pokedex',
    color: 'bg-[#4fc1a6]',
    shadowColor: 'shadow-[0_10px_20px_-4px_rgba(79,193,166,0.4)]',
    hoverShadowColor: 'hover:shadow-[0_18px_30px_-6px_rgba(79,193,166,0.6)]',
  },
  {
    id: 'moves',
    name: 'Moves',
    color: 'bg-[#f7786b]',
    shadowColor: 'shadow-[0_10px_20px_-4px_rgba(247,120,107,0.4)]',
    hoverShadowColor: 'hover:shadow-[0_18px_30px_-6px_rgba(247,120,107,0.6)]',
  },
  {
    id: 'abilities',
    name: 'Abilities',
    color: 'bg-[#58a9f3]',
    shadowColor: 'shadow-[0_10px_20px_-4px_rgba(88,169,243,0.4)]',
    hoverShadowColor: 'hover:shadow-[0_18px_30px_-6px_rgba(88,169,243,0.6)]',
  },
  {
    id: 'items',
    name: 'Items',
    color: 'bg-[#ffce4b]',
    shadowColor: 'shadow-[0_10px_20px_-4px_rgba(255,206,75,0.4)]',
    hoverShadowColor: 'hover:shadow-[0_18px_30px_-6px_rgba(255,206,75,0.6)]',
  },
  {
    id: 'locations',
    name: 'Locations',
    color: 'bg-[#7c538c]',
    shadowColor: 'shadow-[0_10px_20px_-4px_rgba(124,83,140,0.4)]',
    hoverShadowColor: 'hover:shadow-[0_18px_30px_-6px_rgba(124,83,140,0.6)]',
  },
  {
    id: 'type-charts',
    name: 'Type Charts',
    color: 'bg-[#b1736c]',
    shadowColor: 'shadow-[0_10px_20px_-4px_rgba(177,115,108,0.4)]',
    hoverShadowColor: 'hover:shadow-[0_18px_30px_-6px_rgba(177,115,108,0.6)]',
  },
];

const NEWS: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Pokemon Rumble Rush Arrives Soon',
    date: '15 May 2019',
    imageUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/448.png',
    gradient: 'from-[#4facfe] to-[#00f2fe]',
    pokemonName: 'Lucario',
  },
  {
    id: 'news-2',
    title: 'Detective Pikachu Sleuths into Pokemon GO',
    date: '09 May 2019',
    imageUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    gradient: 'from-[#f6d365] to-[#fda085]',
    pokemonName: 'Pikachu',
  },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  const handleImageLoad = (id: string) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  const handleCategoryClick = (categoryName: string) => {
    alert(`Navigating to ${categoryName}... (Feature coming soon!)`);
  };

  const filteredCategories = CATEGORIES.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className='min-h-screen bg-surface transition-colors duration-300'>
      <div className='absolute top-0 right-0 w-[350px] h-[350px] md:w-[500px] md:h-[500px] text-slate-100 pointer-events-none transform translate-x-16 -translate-y-16 overflow-hidden'>
        <svg
          viewBox='0 0 100 100'
          fill='currentColor'
          className='w-full h-full opacity-60'
        >
          <path d='M 50 10 C 27.9 10 10 27.9 10 50 C 10 72.1 27.9 90 50 90 C 72.1 90 90 72.1 90 50 C 90 27.9 72.1 10 50 10 z M 50 18 C 65.5 18 78.5 29 81.5 44 L 62 44 C 59.8 39.5 55.3 36.5 50 36.5 C 44.7 36.5 40.2 39.5 38 44 L 18.5 44 C 21.5 29 34.5 18 50 18 z M 50 82 C 34.5 82 21.5 71 18.5 56 L 38 56 C 40.2 60.5 44.3 63.5 50 63.5 C 55.7 63.5 59.8 60.5 62 56 L 81.5 56 C 78.5 71 65.5 82 50 82 z M 50 44 C 53.3 44 56 46.7 56 50 C 56 53.3 53.3 56 50 56 C 46.7 56 44 53.3 44 50 C 44 46.7 46.7 44 50 44 z' />
        </svg>
      </div>

      <main className='relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-20 flex flex-col gap-12'>
        <div className='flex flex-col gap-8 max-w-3xl'>
          <h1 className='text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight md:leading-[1.1]'>
            What Pokemon <br className='hidden sm:inline' />
            are you looking for?
          </h1>

          <SearchInput
            className='max-w-xl'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className='flex flex-col gap-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl md:text-2xl font-bold text-slate-900'>
              Categories
            </h2>
            {searchQuery && (
              <TextLink
                onClick={() => setSearchQuery('')}
                className='text-xs md:text-sm text-on-surface-variant hover:text-on-surface'
              >
                Clear filter
              </TextLink>
            )}
          </div>

          {filteredCategories.length > 0 ? (
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5'>
              {filteredCategories.map((category) => {
                const cardClassName = `group relative overflow-hidden h-24 md:h-28 rounded-2xl md:rounded-3xl ${category.color} ${category.shadowColor} ${category.hoverShadowColor} flex items-center pl-6 pr-4 text-left transition-all duration-300 ease-out hover:scale-[1.04] active:scale-[0.98] outline-none focus:ring-4 focus:ring-offset-2 focus:ring-slate-200 cursor-pointer w-full`;

                if (category.id === 'pokedex') {
                  return (
                    <Link
                      key={category.id}
                      href='/pokedex'
                      className={cardClassName}
                    >
                      <CategoryCardContent name={category.name} />
                    </Link>
                  );
                }

                return (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.name)}
                    className={cardClassName}
                  >
                    <CategoryCardContent name={category.name} />
                  </button>
                );
              })}
            </div>
          ) : (
            <div className='py-8 text-center text-slate-400 bg-slate-100/50 rounded-2xl border border-dashed border-slate-200'>
              No categories found matching &quot;{searchQuery}&quot;
            </div>
          )}
        </div>

        <div className='flex flex-col gap-6 mt-4'>
          <div className='flex items-center justify-between border-b border-slate-100 pb-4'>
            <h2 className='text-2xl font-extrabold text-slate-900 tracking-tight'>
              Pokemon News
            </h2>
            <TextLink
              onClick={() => alert('Viewing all news... (Coming soon!)')}
              className='text-sm font-bold'
            >
              View All
            </TextLink>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {NEWS.map((item) => (
              <NewsCard
                key={item.id}
                title={item.title}
                date={item.date}
                imageUrl={item.imageUrl}
                pokemonName={item.pokemonName}
                accentGradient={item.gradient}
                isImageLoaded={loadedImages[item.id]}
                onImageLoad={() => handleImageLoad(item.id)}
                onClick={() => alert(`Opening "${item.title}"...`)}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
