import { FavoriteEntry } from "@/features/favorites/types";

const STORAGE_KEY = "pokemon-favorites";

const isBrowser = () => typeof window !== "undefined";

export const readFavorites = (): FavoriteEntry[] => {
  if (!isBrowser()) return [];

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as FavoriteEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const writeFavorites = (entries: FavoriteEntry[]) => {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
};
