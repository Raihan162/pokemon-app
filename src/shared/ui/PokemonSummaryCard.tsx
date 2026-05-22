"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface PokemonSummaryCardProps {
  id: string;
  name: string;
  imageUrl: string;
  types: string[];
  href?: string;
  onClick?: () => void;
}

const getTypeClassName = (type: string) => {
  switch (type.toLowerCase()) {
    case "fire":
      return "bg-type-fire text-white";
    case "water":
      return "bg-type-water text-white";
    case "grass":
      return "bg-type-grass text-white";
    case "electric":
      return "bg-type-electric text-slate-900";
    case "poison":
      return "bg-type-poison text-white";
    default:
      return "bg-surface-container text-on-surface";
  }
};

export const PokemonSummaryCard = ({
  id,
  name,
  imageUrl,
  types,
  href,
  onClick,
}: PokemonSummaryCardProps) => {
  const content = (
    <div className="group flex flex-col gap-3 rounded-[var(--radius-ds-lg)] border border-outline-variant/30 bg-surface-container-lowest p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:-translate-y-1 hover:shadow-[0_14px_32px_rgb(0,0,0,0.08)]">
      <span className="text-xs font-semibold text-on-surface-variant">{id}</span>
      <div className="relative mx-auto h-32 w-32">
        <Image src={imageUrl} alt={name} fill className="object-contain" />
      </div>
      <h3 className="text-center text-lg font-bold text-on-surface">{name}</h3>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {types.map((type) => (
          <span
            key={type}
            className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[var(--tracking-label-sm)] ${getTypeClassName(type)}`}
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className="block w-full text-left">
        {content}
      </button>
    );
  }

  return content;
};
