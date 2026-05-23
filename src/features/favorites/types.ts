import { POKEMON_COLLECTION_TYPES } from "@/features/pokemon/constants";

export type CollectionType = (typeof POKEMON_COLLECTION_TYPES)[number];

export interface FavoriteFormValues {
  nickname: string;
  collectionType: CollectionType;
  description: string;
}

export interface FavoriteEntry {
  pokemonId: number;
  pokemonName: string;
  nickname: string;
  collectionType: CollectionType;
  description: string;
}
