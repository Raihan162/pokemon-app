"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SearchInput } from "@/components/ui/SearchInput";
import { PokemonCard } from "@/components/ui/PokemonCard";
import { POKEMON_LIST } from "@/lib/pokemon";

export default function PokedexPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  // Get all unique types for filtering
  const allTypes = ["All", "Grass", "Poison", "Fire", "Water", "Electric"];

  // Filter Pokemon based on search query and type badge selection
  const filteredPokemon = POKEMON_LIST.filter((pokemon) => {
    const matchesSearch = pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pokemon.id.includes(searchQuery);
    const matchesType = selectedType === "All" || pokemon.types.includes(selectedType);
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300">
      {/* Top Header Background Pokeball Accent */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] text-slate-50 dark:text-zinc-900/30 pointer-events-none transform translate-x-12 -translate-y-12 overflow-hidden z-0">
        <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full opacity-50">
          <path d="M 50 10 C 27.9 10 10 27.9 10 50 C 10 72.1 27.9 90 50 90 C 72.1 90 90 72.1 90 50 C 90 27.9 72.1 10 50 10 z M 50 18 C 65.5 18 78.5 29 81.5 44 L 62 44 C 59.8 39.5 55.3 36.5 50 36.5 C 44.7 36.5 40.2 39.5 38 44 L 18.5 44 C 21.5 29 34.5 18 50 18 z M 50 82 C 34.5 82 21.5 71 18.5 56 L 38 56 C 40.2 60.5 44.3 63.5 50 63.5 C 55.7 63.5 59.8 60.5 62 56 L 81.5 56 C 78.5 71 65.5 82 50 82 z M 50 44 C 53.3 44 56 46.7 56 50 C 56 53.3 53.3 56 50 56 C 46.7 56 44 53.3 44 50 C 44 46.7 46.7 44 50 44 z" />
        </svg>
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-10 md:py-16 flex flex-col gap-8 md:gap-12">
        {/* Navigation & Header */}
        <div className="flex flex-col gap-6">
          <Link
            href="/"
            className="group flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors w-fit font-semibold text-sm md:text-base cursor-pointer"
          >
            <svg
              className="w-5 h-5 transform transition-transform group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-zinc-50 tracking-tight leading-none">
                Pokédex
              </h1>
              <p className="text-slate-400 dark:text-zinc-500 font-medium text-sm md:text-base">
                Showing {filteredPokemon.length} of {POKEMON_LIST.length} Pokémon
              </p>
            </div>

            {/* Reusable SearchInput */}
            <SearchInput
              className="max-w-md md:w-80"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or number..."
            />
          </div>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap gap-2 md:gap-3 items-center">
          <span className="text-xs md:text-sm font-bold text-slate-400 dark:text-zinc-500 mr-2 uppercase tracking-wider">
            Filter Type:
          </span>
          {allTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 text-xs md:text-sm font-bold rounded-full transition-all duration-300 cursor-pointer border ${selectedType === type
                ? "bg-slate-900 text-white border-slate-900 dark:bg-zinc-50 dark:text-zinc-950 dark:border-zinc-50 shadow-md shadow-slate-900/10 dark:shadow-none"
                : "bg-slate-50 text-slate-500 border-slate-100 hover:bg-slate-100 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800 dark:hover:bg-zinc-800"
                }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Pokemon Cards Grid */}
        {filteredPokemon.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPokemon.map((pokemon) => (
              <Link
                key={pokemon.id}
                href={`/pokedex/${pokemon.id.replace("#", "")}`}
                className="contents cursor-pointer"
              >
                <PokemonCard pokemon={pokemon} />
              </Link>
            ))}

            {/* Exactly 2 Custom Empty Placeholder Cards at the end (matching the design image perfectly!) */}
            <div className="flex flex-col p-4 sm:p-5 rounded-[28px] border border-slate-100/70 dark:border-zinc-900 bg-slate-50/20 dark:bg-zinc-900/10 min-h-[300px] border-dashed items-center justify-center pointer-events-none select-none opacity-40">
              <div className="w-12 h-12 rounded-full border-2 border-dashed border-slate-300 dark:border-zinc-700 flex items-center justify-center text-slate-300 dark:text-zinc-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </div>
            </div>
            <div className="flex flex-col p-4 sm:p-5 rounded-[28px] border border-slate-100/70 dark:border-zinc-900 bg-slate-50/20 dark:bg-zinc-900/10 min-h-[300px] border-dashed items-center justify-center pointer-events-none select-none opacity-40">
              <div className="w-12 h-12 rounded-full border-2 border-dashed border-slate-300 dark:border-zinc-700 flex items-center justify-center text-slate-300 dark:text-zinc-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-20 text-center text-slate-400 bg-slate-50/50 dark:bg-zinc-900/30 rounded-3xl border border-dashed border-slate-200 dark:border-zinc-800">
            <svg
              className="w-12 h-12 mx-auto text-slate-300 dark:text-zinc-700 mb-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            No Pokémon found matching "{searchQuery}" and type "{selectedType}"
          </div>
        )}
      </main>
    </div>
  );
}
