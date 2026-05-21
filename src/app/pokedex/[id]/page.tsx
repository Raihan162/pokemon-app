"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { POKEMON_LIST } from "@/lib/pokemon";

// Helper for type color styles
const getTypeColorClass = (type: string): string => {
  switch (type.toLowerCase()) {
    case "grass":
      return "bg-[#60ceb6] text-white shadow-[#60ceb6]/20";
    case "poison":
      return "bg-[#a453bf] text-white shadow-[#a453bf]/20";
    case "fire":
      return "bg-[#f7786b] text-white shadow-[#f7786b]/20";
    case "water":
      return "bg-[#58a9f3] text-white shadow-[#58a9f3]/20";
    case "electric":
      return "bg-[#ffce4b] text-slate-900 shadow-[#ffce4b]/20";
    case "flying":
      return "bg-[#58c9f3] text-white shadow-[#58c9f3]/20";
    default:
      return "bg-slate-200 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300";
  }
};

// Premium inline SVG icons for each type
const getTypeIcon = (type: string) => {
  const size = "w-4 h-4";
  switch (type.toLowerCase()) {
    case "grass":
      return (
        <svg className={size} fill="currentColor" viewBox="0 0 24 24">
          <path d="M17 8C8 10 5.9 16.2 5 21c4.8-.9 11-3 13-12 .7-3.1-.9-4.8-1-1zm-2 5c-1 3.5-4.1 5.9-7.5 6.8.9-3.4 3.3-6.5 6.8-7.5.4.3.5.5.7.7z" />
        </svg>
      );
    case "poison":
      return (
        <svg className={size} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm3 11H9v-2h6v2z" />
        </svg>
      );
    case "fire":
      return (
        <svg className={size} fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.5 11.5c-.8-1.5-2.5-2.8-4-3.5 1.5 2.5.5 5.5-2 6.5-2.3 1-3.5-.8-3.5-2.5 0-1.8.8-3.8 2-5-2.5.5-5 3.2-5 7 0 4.1 3.4 7.5 7.5 7.5s7.5-3.4 7.5-7.5c0-.8-.2-1.7-.5-2.5z" />
        </svg>
      );
    case "water":
      return (
        <svg className={size} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.7c-.3 0-.6.2-.8.4l-6.4 7.8c-2.3 2.8-2.3 6.8 0 9.6s6 2.8 8.4 0 2.3-6.8 0-9.6L12.8 3.1c-.2-.2-.5-.4-.8-.4z" />
        </svg>
      );
    case "electric":
      return (
        <svg className={size} fill="currentColor" viewBox="0 0 24 24">
          <path d="M11 21h-1l1.5-6.5h-5l7-11.5h1l-1.5 6.5h5L11 21z" />
        </svg>
      );
    case "flying":
      return (
        <svg className={size} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.2c-.3.7-.8 1.4-1.5 1.9-1.2.9-2.9 1-4.2.2-.6-.4-1.2-.6-1.9-.5.8 1.2 2.1 2 3.6 2 2.2 0 4-1.8 4-4 0-.6-.2-1.1-.5-1.6zm7.2 4.1c-1.3-.8-3-.7-4.2.2-.7.5-1.2 1.2-1.5 1.9-.3-.5-.5-1-.5-1.6 0-2.2 1.8-4 4-4 1.5 0 2.8.8 3.6 2-.7-.1-1.3.1-1.9.5z" />
        </svg>
      );
    default:
      return null;
  }
};

// Gradient background theme based on Pokemon primary type
const getDetailThemeGradient = (type: string): string => {
  switch (type.toLowerCase()) {
    case "grass":
      return "from-emerald-50 via-emerald-100/30 to-white dark:from-emerald-950/20 dark:via-zinc-950 dark:to-zinc-950";
    case "fire":
      return "from-orange-50 via-orange-100/30 to-white dark:from-orange-950/20 dark:via-zinc-950 dark:to-zinc-950";
    case "water":
      return "from-blue-50 via-blue-100/30 to-white dark:from-blue-950/20 dark:via-zinc-950 dark:to-zinc-950";
    case "electric":
      return "from-yellow-50 via-yellow-100/20 to-white dark:from-yellow-950/20 dark:via-zinc-950 dark:to-zinc-950";
    default:
      return "from-slate-50 via-slate-100/30 to-white dark:from-zinc-900/20 dark:via-zinc-950 dark:to-zinc-950";
  }
};

export default function PokemonDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Look up the Pokemon based on URL ID slug mapping to '#XYZ'
  const pokemon = POKEMON_LIST.find((p) => p.id.replace("#", "") === id);

  if (!pokemon) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-red-50 dark:bg-red-950/20 flex items-center justify-center mb-6 border border-red-100 dark:border-red-900/30 text-red-500">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-zinc-200 tracking-tight">
          Pokémon Not Found
        </h1>
        <p className="text-slate-400 dark:text-zinc-500 mt-2 max-w-sm">
          The Pokémon with number #{id} could not be found or has not been unlocked yet.
        </p>
        <Link
          href="/pokedex"
          className="mt-6 px-6 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200 font-bold rounded-2xl shadow-lg transition-all duration-300"
        >
          Back to Pokédex
        </Link>
      </div>
    );
  }

  const primaryType = pokemon.types[0];
  const pageThemeClass = getDetailThemeGradient(primaryType);

  return (
    <div className={`min-h-screen bg-gradient-to-b ${pageThemeClass} transition-all duration-300 pb-28 relative overflow-x-hidden`}>
      {/* Accent Pokeball background in top-right */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[450px] md:h-[450px] text-slate-200/50 dark:text-zinc-900/20 pointer-events-none transform translate-x-12 -translate-y-12 overflow-hidden z-0">
        <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full opacity-60">
          <path d="M 50 10 C 27.9 10 10 27.9 10 50 C 10 72.1 27.9 90 50 90 C 72.1 90 90 72.1 90 50 C 90 27.9 72.1 10 50 10 z M 50 18 C 65.5 18 78.5 29 81.5 44 L 62 44 C 59.8 39.5 55.3 36.5 50 36.5 C 44.7 36.5 40.2 39.5 38 44 L 18.5 44 C 21.5 29 34.5 18 50 18 z M 50 82 C 34.5 82 21.5 71 18.5 56 L 38 56 C 40.2 60.5 44.3 63.5 50 63.5 C 55.7 63.5 59.8 60.5 62 56 L 81.5 56 C 78.5 71 65.5 82 50 82 z M 50 44 C 53.3 44 56 46.7 56 50 C 56 53.3 53.3 56 50 56 C 46.7 56 44 53.3 44 50 C 44 46.7 46.7 44 50 44 z" />
        </svg>
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-10 flex flex-col gap-8">
        {/* Navigation back bar */}
        <div className="flex items-center">
          <Link
            href="/pokedex"
            className="group flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md border border-slate-200/20 dark:border-zinc-800/30 text-slate-700 hover:text-slate-900 dark:text-zinc-300 dark:hover:text-zinc-100 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.015)] cursor-pointer font-bold text-sm md:text-base"
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
            Back to Pokédex
          </Link>
        </div>

        {/* 2-Column Responsive Dashboard Layout (widescreen-friendly!) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start mt-4">
          
          {/* LEFT COLUMN: Image & Header Block */}
          <div className="flex flex-col gap-6 md:sticky md:top-10">
            {/* Dark Vignette Box for high fidelity image background */}
            <div className={`w-full aspect-square md:aspect-[4/3] lg:aspect-square rounded-[36px] bg-gradient-to-b ${pokemon.darkBoxClass} relative overflow-hidden flex items-center justify-center p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-950/20`}>
              
              {/* Shimmering loading background */}
              {!isImageLoaded && (
                <div className="absolute inset-0 z-20 animate-pulse bg-gradient-to-br from-zinc-800 via-zinc-700 to-zinc-800" />
              )}

              {/* Pokéball subtle background inside dark frame */}
              <svg viewBox="0 0 100 100" fill="currentColor" className="absolute w-[110%] h-[110%] text-white/5 pointer-events-none transform -rotate-12 z-0">
                <path d="M 50 10 C 27.9 10 10 27.9 10 50 C 10 72.1 27.9 90 50 90 C 72.1 90 90 72.1 90 50 C 90 27.9 72.1 10 50 10 z M 50 18 C 65.5 18 78.5 29 81.5 44 L 62 44 C 59.8 39.5 55.3 36.5 50 36.5 C 44.7 36.5 40.2 39.5 38 44 L 18.5 44 C 21.5 29 34.5 18 50 18 z M 50 82 C 34.5 82 21.5 71 18.5 56 L 38 56 C 40.2 60.5 44.3 63.5 50 63.5 C 55.7 63.5 59.8 60.5 62 56 L 81.5 56 C 78.5 71 65.5 82 50 82 z M 50 44 C 53.3 44 56 46.7 56 50 C 56 53.3 53.3 56 50 56 C 46.7 56 44 53.3 44 50 C 44 46.7 46.7 44 50 44 z" />
              </svg>

              {/* Pokémon High Fidelity artwork */}
              <Image
                src={pokemon.imageUrl}
                alt={pokemon.name}
                width={360}
                height={360}
                priority
                className={`object-contain max-h-[85%] max-w-[85%] drop-shadow-[0_16px_32px_rgba(0,0,0,0.5)] z-10 transition-all duration-700 ease-out hover:scale-105 ${
                  isImageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-90"
                }`}
                onLoad={() => setIsImageLoaded(true)}
              />
            </div>

            {/* Profile Info Sheet (embedded beautifully inside Left column) */}
            <div className="bg-white dark:bg-zinc-900 rounded-[32px] p-6 sm:p-8 border border-slate-100 dark:border-zinc-900 shadow-[0_10px_35px_rgba(0,0,0,0.015)] flex flex-col gap-5">
              
              <div className="flex flex-col gap-1.5">
                <span className="text-sm sm:text-base font-extrabold text-slate-400 dark:text-zinc-500 tracking-wider">
                  {pokemon.id}
                </span>
                <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-zinc-50 tracking-tight leading-none">
                  {pokemon.name}
                </h1>
              </div>

              {/* Description text */}
              <p className="text-slate-500 dark:text-zinc-400 leading-relaxed font-medium text-sm sm:text-base">
                {pokemon.description}
              </p>

              {/* Type pill elements */}
              <div className="flex items-center gap-2 flex-wrap">
                {pokemon.types.map((type) => (
                  <div
                    key={type}
                    className={`flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-bold tracking-wider uppercase rounded-full shadow-sm ${getTypeColorClass(
                      type
                    )}`}
                  >
                    {getTypeIcon(type)}
                    <span>{type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Stats & Details Sheets */}
          <div className="flex flex-col gap-6">

            {/* Section 1: Physical Traits */}
            <div className="bg-white dark:bg-zinc-900 rounded-[32px] p-6 sm:p-8 border border-slate-100 dark:border-zinc-900 shadow-[0_10px_35px_rgba(0,0,0,0.015)] flex flex-col gap-6">
              
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-50 dark:border-zinc-800/40">
                {/* Physical icon */}
                <div className="text-red-500 dark:text-rose-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-slate-800 dark:text-zinc-200 tracking-tight">
                  Physical Traits
                </h2>
              </div>

              {/* Traits Side-By-Side */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50/70 dark:bg-zinc-900/50 rounded-2xl p-4 sm:p-5 border border-slate-100/40 dark:border-zinc-800/20 text-center flex flex-col gap-1">
                  <span className="text-xs sm:text-sm font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
                    Height
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-slate-800 dark:text-zinc-100">
                    {pokemon.height}
                  </span>
                </div>
                <div className="bg-slate-50/70 dark:bg-zinc-900/50 rounded-2xl p-4 sm:p-5 border border-slate-100/40 dark:border-zinc-800/20 text-center flex flex-col gap-1">
                  <span className="text-xs sm:text-sm font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
                    Weight
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-slate-800 dark:text-zinc-100">
                    {pokemon.weight}
                  </span>
                </div>
              </div>
            </div>

            {/* Section 2: Abilities */}
            <div className="bg-white dark:bg-zinc-900 rounded-[32px] p-6 sm:p-8 border border-slate-100 dark:border-zinc-900 shadow-[0_10px_35px_rgba(0,0,0,0.015)] flex flex-col gap-5">
              
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-50 dark:border-zinc-800/40">
                <div className="text-red-500 dark:text-rose-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-slate-800 dark:text-zinc-200 tracking-tight">
                  Abilities
                </h2>
              </div>

              {/* Abilities Rows */}
              <div className="flex flex-col gap-3.5">
                {pokemon.abilities?.map((ability) => (
                  <div
                    key={ability.name}
                    className={`rounded-2xl p-4 flex flex-col gap-1 transition-all duration-300 ${
                      ability.isHidden
                        ? "bg-rose-500/[0.02] border border-red-100/50 dark:border-red-950/20"
                        : "bg-slate-50/50 dark:bg-zinc-900/30 border border-slate-100/40 dark:border-zinc-800/10"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-extrabold text-sm sm:text-base text-slate-800 dark:text-zinc-200">
                        {ability.name}
                      </span>
                      {ability.isHidden && (
                        <span className="px-2 py-0.5 text-[9px] font-extrabold tracking-widest uppercase rounded-md bg-rose-50 text-rose-500 border border-rose-100 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-900/30">
                          Hidden
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400 dark:text-zinc-500 font-medium leading-relaxed mt-1">
                      {ability.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: Base Stats */}
            <div className="bg-white dark:bg-zinc-900 rounded-[32px] p-6 sm:p-8 border border-slate-100 dark:border-zinc-900 shadow-[0_10px_35px_rgba(0,0,0,0.015)] flex flex-col gap-6">
              
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-50 dark:border-zinc-800/40">
                <div className="text-red-500 dark:text-rose-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
                  </svg>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-slate-800 dark:text-zinc-200 tracking-tight">
                  Base Stats
                </h2>
              </div>

              {/* Stats Rows */}
              <div className="flex flex-col gap-4">
                {pokemon.stats &&
                  Object.entries({
                    HP: pokemon.stats.hp,
                    ATK: pokemon.stats.atk,
                    DEF: pokemon.stats.def,
                    "SP.ATK": pokemon.stats.spatk,
                    "SP.DEF": pokemon.stats.spdef,
                    SPD: pokemon.stats.spd,
                  }).map(([label, val]) => {
                    const isHigh = val >= 100;
                    const maxStat = 180; // normalized max to determine visual percentage
                    const barPercentage = Math.min((val / maxStat) * 100, 100);

                    return (
                      <div key={label} className="grid grid-cols-12 items-center gap-3">
                        {/* Stat label */}
                        <span className="col-span-2 text-xs font-black text-slate-400 dark:text-zinc-500 tracking-wide text-left">
                          {label}
                        </span>
                        
                        {/* Stat value */}
                        <span className="col-span-1.5 text-sm font-extrabold text-slate-700 dark:text-zinc-300 text-right pr-1">
                          {val}
                        </span>

                        {/* Progress Bar Track */}
                        <div className="col-span-8.5 h-2 w-full rounded-full bg-slate-100 dark:bg-zinc-800/80 overflow-hidden relative">
                          <div
                            style={{ width: `${barPercentage}%` }}
                            className={`h-full rounded-full transition-all duration-1000 ease-out ${
                              isHigh
                                ? "bg-[#4fc1a6] shadow-[0_0_8px_rgba(79,193,166,0.3)]"
                                : "bg-[#ffce4b] shadow-[0_0_8px_rgba(255,206,75,0.2)]"
                            }`}
                          />
                        </div>
                      </div>
                    );
                  })}

                {/* Total Stats Row */}
                <div className="flex items-center justify-between border-t border-slate-50 dark:border-zinc-800/40 pt-4 mt-2">
                  <span className="text-sm font-extrabold text-slate-500 dark:text-zinc-400">
                    Total
                  </span>
                  <span className="text-2xl font-black text-[#e63c3c] tracking-tight">
                    {pokemon.totalStats}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Floating favorite heart button with premium click animations */}
      <button
        onClick={() => setIsFavorite(!isFavorite)}
        aria-label="Add to favorites"
        className={`fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full flex items-center justify-center shadow-[0_10px_35px_rgba(229,57,57,0.3)] transition-all duration-300 cursor-pointer active:scale-90 hover:scale-110 hover:-translate-y-1 ${
          isFavorite
            ? "bg-gradient-to-br from-red-500 to-rose-600 text-white"
            : "bg-white text-slate-400 hover:text-red-500 border border-slate-100 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800"
        }`}
      >
        <svg
          className={`w-7 h-7 transform transition-all duration-300 ${
            isFavorite ? "scale-110 fill-current text-white stroke-none" : "fill-none stroke-current"
          }`}
          strokeWidth="2.2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
      </button>
    </div>
  );
}
