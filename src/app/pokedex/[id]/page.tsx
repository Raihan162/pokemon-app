"use client";

import { use, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { FavoritesForm } from "@/features/pokemon/components/FavoritesForm";
import { usePokemonDetailQuery } from "@/features/pokemon/hooks/usePokemonDetailQuery";
import { useFavorites } from "@/features/favorites/hooks/useFavorites";
import { FavoriteFormValues } from "@/features/favorites/types";
import { PrimaryButton } from "@/shared/ui/PrimaryButton";
import { TextLink } from "@/shared/ui/TextLink";

export default function PokemonDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const detailQuery = usePokemonDetailQuery(id);
  const [showForm, setShowForm] = useState(false);
  const { addFavorite, favorites } = useFavorites();
  const modalTitleId = "capture-collection-modal-title";

  const collectionCount = useMemo(() => {
    const pokemonId = Number(id);
    if (Number.isNaN(pokemonId)) return 0;
    return favorites.filter((entry) => entry.pokemonId === pokemonId).length;
  }, [favorites, id]);

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleSaveFavorite = (values: FavoriteFormValues) => {
    if (!detailQuery.data) return;
    addFavorite(detailQuery.data.id, detailQuery.data.name, values);
    handleCloseForm();
  };

  useEffect(() => {
    if (!showForm) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCloseForm();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showForm]);

  useEffect(() => {
    if (!showForm) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [showForm]);

  if (detailQuery.isLoading) {
    return <div className="min-h-screen bg-surface flex items-center justify-center text-on-surface-variant">Loading Pokemon detail...</div>;
  }

  if (detailQuery.isError || !detailQuery.data) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center gap-4">
        <p className="px-4 py-2 rounded-xl bg-error text-on-error">Failed to load Pokemon detail.</p>
        <TextLink href="/pokedex">
          Back to Pokedex
        </TextLink>
      </div>
    );
  }

  const pokemon = detailQuery.data;

  return (
    <div className="min-h-screen bg-surface">
      <main className="max-w-4xl mx-auto px-6 py-10 flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <TextLink href="/pokedex">
          Back to Pokedex
          </TextLink>
          <TextLink href="/collection">View Collection</TextLink>
        </div>

        <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/40 p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 shadow-[0_8px_24px_rgba(0,0,0,0.03)]">
          <div className="bg-surface-container rounded-2xl p-6 flex items-center justify-center">
            <Image src={pokemon.imageUrl} alt={pokemon.name} width={260} height={260} priority />
          </div>

          <div className="flex flex-col gap-5">
            <div>
              <p className="text-sm text-on-surface-variant">#{String(pokemon.id).padStart(3, "0")}</p>
              <h1 className="text-4xl font-extrabold text-on-surface">{pokemon.name}</h1>
            </div>

            <div className="flex flex-wrap gap-2">
              {pokemon.types.map((type) => (
                <span
                  key={type}
                  className="px-3 py-1 rounded-full text-xs font-bold bg-primary text-on-primary"
                >
                  {type}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-surface-container-low border border-outline-variant/30 p-3">
                <p className="text-xs text-on-surface-variant">Height</p>
                <p className="text-lg font-bold text-on-surface">{pokemon.heightMeters} m</p>
              </div>
              <div className="rounded-xl bg-surface-container-low border border-outline-variant/30 p-3">
                <p className="text-xs text-on-surface-variant">Weight</p>
                <p className="text-lg font-bold text-on-surface">{pokemon.weightKg} kg</p>
              </div>
            </div>

            <PrimaryButton
              onClick={() => setShowForm(true)}
              className="w-fit"
            >
              {collectionCount > 0 ? "Add Another to Collection" : "Add to Collection"}
            </PrimaryButton>

            {collectionCount > 0 && (
              <p className="text-xs text-on-surface-variant">
                This Pokemon is already in your collection ({collectionCount} entr{collectionCount > 1 ? "ies" : "y"}).
              </p>
            )}
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/40 p-6 shadow-[0_8px_24px_rgba(0,0,0,0.03)]">
          <h2 className="text-xl font-bold text-on-surface mb-4">Base Stats</h2>
          <div className="flex flex-col gap-3">
            {pokemon.stats.map((stat) => (
              <div key={stat.name} className="grid grid-cols-12 items-center gap-3">
                <span className="col-span-3 text-xs font-bold text-on-surface-variant">{stat.name}</span>
                <span className="col-span-2 text-sm font-bold text-on-surface">{stat.value}</span>
                <div className="col-span-7 h-2 bg-surface-container-high rounded-full overflow-hidden">
                  <div
                    className="h-2 bg-primary rounded-full"
                    style={{ width: `${Math.min((stat.value / 180) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {showForm && (
          <div
            className="fixed inset-0 z-50 bg-black/40 p-4 flex items-center justify-center"
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                handleCloseForm();
              }
            }}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby={modalTitleId}
              className="w-full max-w-xl max-h-[calc(100vh-2rem)] overflow-y-auto bg-surface-container-lowest rounded-3xl border border-outline-variant/40 p-6 shadow-[0_16px_40px_rgba(0,0,0,0.2)]"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 id={modalTitleId} className="text-xl font-bold text-on-surface">
                  Capture to Collection
                </h2>
                <button
                  type="button"
                  aria-label="Close capture form"
                  onClick={handleCloseForm}
                  className="h-9 w-9 rounded-full border border-outline-variant/60 text-on-surface-variant hover:bg-surface-container focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                >
                  X
                </button>
              </div>

              <FavoritesForm
                onSubmit={handleSaveFavorite}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
