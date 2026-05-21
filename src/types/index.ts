import { InputHTMLAttributes } from "react";

// Category Interface for Pokemon home screen
export interface Category {
  id: string;
  name: string;
  color: string;
  shadowColor: string;
  hoverShadowColor: string;
}

// News Item Interface for Pokemon home screen news feed
export interface NewsItem {
  id: string;
  title: string;
  date: string;
  imageUrl: string;
  gradient: string;
  pokemonName: string;
}

// Props for the reusable SearchInput component
export interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void;
}

// Pokemon Interface for Pokedex list
export interface PokemonAbility {
  name: string;
  description: string;
  isHidden?: boolean;
}

export interface PokemonStats {
  hp: number;
  atk: number;
  def: number;
  spatk: number;
  spdef: number;
  spd: number;
}

export interface Pokemon {
  id: string; // e.g. "#001"
  name: string;
  imageUrl: string;
  types: string[];
  bgClass: string;
  darkBoxClass: string;
  description?: string;
  height?: string;
  weight?: string;
  abilities?: PokemonAbility[];
  stats?: PokemonStats;
  totalStats?: number;
}

// Props for the PokemonCard component
export interface PokemonCardProps {
  pokemon: Pokemon;
  onClick?: () => void;
}
