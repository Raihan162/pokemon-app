"use client";

import Link from "next/link";
import { useFavorites } from "@/features/favorites/hooks/useFavorites";
import { SecondaryButton } from "@/shared/ui/SecondaryButton";
import { TextLink } from "@/shared/ui/TextLink";

export default function CollectionPage() {
  const { favorites, removeFavorite, isLoading } = useFavorites();

  return (
    <div className="min-h-screen bg-surface transition-colors duration-300">
      <main className="max-w-7xl mx-auto px-6 py-10 md:py-16 flex flex-col gap-8">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <TextLink href="/pokedex">Back to Pokedex</TextLink>
          <h1 className="text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight">
            Collection
          </h1>
        </div>

        {isLoading ? (
          <div className="py-16 text-center text-on-surface-variant">Loading collection...</div>
        ) : favorites.length === 0 ? (
          <div className="py-20 text-center text-on-surface-variant bg-surface-container-low rounded-3xl border border-dashed border-outline-variant">
            Your collection is still empty.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {favorites.map((entry) => (
              <article
                key={entry.pokemonId}
                className="rounded-[24px] border border-outline-variant/40 bg-surface-container-lowest p-5 flex flex-col gap-3 shadow-[0_8px_24px_rgba(0,0,0,0.03)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold text-on-surface-variant">
                      #{String(entry.pokemonId).padStart(3, "0")}
                    </p>
                    <h2 className="text-xl font-extrabold text-on-surface">{entry.pokemonName}</h2>
                    <p className="text-sm text-on-surface-variant mt-1">
                      Nickname: <span className="font-semibold">{entry.nickname}</span>
                    </p>
                  </div>
                  <span className="text-[10px] font-bold tracking-[var(--tracking-label-sm)] uppercase rounded-full px-3 py-1 bg-primary text-on-primary">
                    {entry.collectionType}
                  </span>
                </div>

                {entry.description && (
                  <p className="text-sm text-on-surface leading-relaxed">{entry.description}</p>
                )}

                <div className="flex items-center justify-between gap-3 mt-2">
                  <Link href={`/pokedex/${entry.pokemonId}`} className="text-sm font-semibold text-secondary">
                    Open Detail
                  </Link>
                  <SecondaryButton
                    onClick={() => removeFavorite(entry.pokemonId)}
                    className="px-3 py-1.5 text-xs rounded-full"
                  >
                    Remove
                  </SecondaryButton>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
