"use client";

import Image from "next/image";
import React from "react";

export interface NewsCardProps {
  title: string;
  date: string;
  imageUrl: string;
  pokemonName: string;
  accentGradient: string;
  isImageLoaded?: boolean;
  onImageLoad?: () => void;
  onClick?: () => void;
}

export const NewsCard = ({
  title,
  date,
  imageUrl,
  pokemonName,
  accentGradient,
  isImageLoaded = true,
  onImageLoad,
  onClick,
}: NewsCardProps) => {
  const content = (
    <>
      <div className="flex flex-col flex-1 gap-1 sm:gap-2">
        <h3 className="text-base sm:text-lg font-bold text-on-surface leading-snug group-hover:text-secondary transition-colors">
          {title}
        </h3>
        <span className="text-xs font-semibold text-on-surface-variant">{date}</span>
      </div>

      <div className="relative w-28 h-20 sm:w-36 sm:h-24 overflow-hidden rounded-2xl flex-shrink-0 shadow-inner bg-surface-container-low">
        {!isImageLoaded && (
          <div className="absolute inset-0 z-20 animate-pulse bg-gradient-to-r from-surface-container-high via-surface-container-low to-surface-container-high" />
        )}
        <div className={`absolute inset-0 bg-gradient-to-br ${accentGradient} opacity-85 z-0`} />
        <div className="absolute inset-0 flex items-center justify-center p-2 z-10 transition-transform duration-500 group-hover:scale-110">
          <Image
            src={imageUrl}
            alt={pokemonName}
            width={100}
            height={100}
            priority
            className={`object-contain max-h-full max-w-full drop-shadow-[0_6px_12px_rgba(0,0,0,0.25)] transition-opacity duration-500 ${isImageLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={onImageLoad}
          />
        </div>
      </div>
    </>
  );

  return (
    <div
      className="group flex items-center justify-between gap-6 p-5 sm:p-6 bg-surface-container-lowest border border-outline-variant/40 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgb(0,0,0,0.06)] hover:border-outline-variant/60 transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      {content}
    </div>
  );
};
