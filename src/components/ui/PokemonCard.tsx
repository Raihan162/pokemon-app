"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PokemonCardProps } from "@/types";

// Helper to get type color styles
const getTypeColorClass = (type: string): string => {
  switch (type.toLowerCase()) {
    case "grass":
      return "bg-[#60ceb6] text-white"; // Bulbasaur green
    case "poison":
      return "bg-[#a453bf] text-white"; // Bulbasaur purple
    case "fire":
      return "bg-[#f7786b] text-white"; // Charmander coral
    case "water":
      return "bg-[#58a9f3] text-white"; // Squirtle blue
    case "electric":
      return "bg-[#ffce4b] text-white"; // Pikachu yellow
    default:
      return "bg-slate-200 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300";
  }
};

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      onClick={onClick}
      className={`group flex flex-col p-4 sm:p-5 rounded-[28px] border ${pokemon.bgClass} shadow-[0_8px_30px_rgb(0,0,0,0.012)] hover:shadow-[0_16px_40px_rgb(0,0,0,0.04)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer`}
    >
      {/* Pokémon Number */}
      <span className="text-xs sm:text-sm font-bold text-slate-400 dark:text-zinc-500/80 mb-3 block">
        {pokemon.id}
      </span>

      {/* Dark Vignette Box for high fidelity image background */}
      <div className={`w-full aspect-square rounded-2xl bg-gradient-to-b ${pokemon.darkBoxClass} relative overflow-hidden flex items-center justify-center p-4 sm:p-5 shadow-inner border border-slate-950/10`}>
        {/* Shimmering loading background */}
        {!isLoaded && (
          <div className="absolute inset-0 z-20 animate-pulse bg-gradient-to-br from-zinc-800 via-zinc-700 to-zinc-800" />
        )}

        {/* Pokéball subtle background inside dark frame */}
        <svg viewBox="0 0 100 100" fill="currentColor" className="absolute w-[120%] h-[120%] text-white/5 pointer-events-none transform -rotate-12 z-0">
          <path d="M 50 10 C 27.9 10 10 27.9 10 50 C 10 72.1 27.9 90 50 90 C 72.1 90 90 72.1 90 50 C 90 27.9 72.1 10 50 10 z M 50 18 C 65.5 18 78.5 29 81.5 44 L 62 44 C 59.8 39.5 55.3 36.5 50 36.5 C 44.7 36.5 40.2 39.5 38 44 L 18.5 44 C 21.5 29 34.5 18 50 18 z M 50 82 C 34.5 82 21.5 71 18.5 56 L 38 56 C 40.2 60.5 44.3 63.5 50 63.5 C 55.7 63.5 59.8 60.5 62 56 L 81.5 56 C 78.5 71 65.5 82 50 82 z M 50 44 C 53.3 44 56 46.7 56 50 C 56 53.3 53.3 56 50 56 C 46.7 56 44 53.3 44 50 C 44 46.7 46.7 44 50 44 z" />
        </svg>

        {/* Artwork Image */}
        <Image
          src={pokemon.imageUrl}
          alt={pokemon.name}
          width={180}
          height={180}
          priority
          className={`object-contain max-h-full max-w-full drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)] z-10 transition-all duration-500 ease-out group-hover:scale-110 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setIsLoaded(true)}
        />
      </div>

      {/* Name */}
      <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 dark:text-zinc-100 text-center mt-4 sm:mt-5 tracking-tight group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
        {pokemon.name}
      </h2>

      {/* Type Badges */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-3 sm:mt-4 flex-wrap">
        {pokemon.types.map((type) => (
          <span
            key={type}
            className={`text-[9px] sm:text-[10px] font-bold tracking-wider uppercase rounded-full px-2.5 sm:px-3 py-1 shadow-sm ${getTypeColorClass(
              type
            )}`}
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
};
