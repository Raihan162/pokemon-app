import { FavoriteEntry } from "@/features/favorites/types";

const STORAGE_KEY = "pokemon-favorites";

const isBrowser = () => typeof window !== "undefined";

export const readFavorites = (): FavoriteEntry[] => {
  if (!isBrowser()) return [];

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];

    return parsed
      .map((entry) => {
        if (!entry || typeof entry !== "object") return null;

        const candidate = entry as Partial<FavoriteEntry>;
        if (typeof candidate.pokemonId !== "number") return null;
        if (typeof candidate.pokemonName !== "string") return null;
        if (typeof candidate.nickname !== "string") return null;
        if (typeof candidate.collectionType !== "string") return null;

        return {
          pokemonId: candidate.pokemonId,
          pokemonName: candidate.pokemonName,
          nickname: candidate.nickname,
          collectionType: candidate.collectionType,
          description: typeof candidate.description === "string" ? candidate.description : "",
        } as FavoriteEntry;
      })
      .filter((entry): entry is FavoriteEntry => entry !== null);
  } catch {
    return [];
  }
};

export const writeFavorites = (entries: FavoriteEntry[]) => {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
};
