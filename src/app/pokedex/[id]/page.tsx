"use client";

import { use, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FavoritesForm } from "@/features/pokemon/components/FavoritesForm";
import { usePokemonDetailQuery } from "@/features/pokemon/hooks/usePokemonDetailQuery";
import { useFavorites } from "@/features/favorites/hooks/useFavorites";
import { FavoriteFormValues } from "@/features/favorites/types";

export default function PokemonDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const detailQuery = usePokemonDetailQuery(id);
  const [showForm, setShowForm] = useState(false);
  const { upsertFavorite, getByPokemonId } = useFavorites();

  const currentFavorite = useMemo(() => {
    const pokemonId = Number(id);
    return Number.isNaN(pokemonId) ? undefined : getByPokemonId(pokemonId);
  }, [getByPokemonId, id]);

  const handleSaveFavorite = (values: FavoriteFormValues) => {
    if (!detailQuery.data) return;
    upsertFavorite(detailQuery.data.id, detailQuery.data.name, values);
    setShowForm(false);
  };

  if (detailQuery.isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading Pokemon detail...</div>;
  }

  if (detailQuery.isError || !detailQuery.data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-red-500">Failed to load Pokemon detail.</p>
        <Link href="/pokedex" className="text-sm font-semibold text-slate-700">
          Back to Pokedex
        </Link>
      </div>
    );
  }

  const pokemon = detailQuery.data;

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="max-w-4xl mx-auto px-6 py-10 flex flex-col gap-8">
        <Link href="/pokedex" className="text-sm font-semibold text-slate-600">
          Back to Pokedex
        </Link>

        <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-100 rounded-2xl p-6 flex items-center justify-center">
            <Image src={pokemon.imageUrl} alt={pokemon.name} width={260} height={260} priority />
          </div>

          <div className="flex flex-col gap-5">
            <div>
              <p className="text-sm text-slate-400">#{String(pokemon.id).padStart(3, "0")}</p>
              <h1 className="text-4xl font-extrabold text-slate-900">{pokemon.name}</h1>
            </div>

            <div className="flex flex-wrap gap-2">
              {pokemon.types.map((type) => (
                <span
                  key={type}
                  className="px-3 py-1 rounded-full text-xs font-bold bg-slate-900 text-white"
                >
                  {type}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-slate-50 border border-slate-100 p-3">
                <p className="text-xs text-slate-500">Height</p>
                <p className="text-lg font-bold text-slate-800">{pokemon.heightMeters} m</p>
              </div>
              <div className="rounded-xl bg-slate-50 border border-slate-100 p-3">
                <p className="text-xs text-slate-500">Weight</p>
                <p className="text-lg font-bold text-slate-800">{pokemon.weightKg} kg</p>
              </div>
            </div>

            <button
              onClick={() => setShowForm((prev) => !prev)}
              className="w-fit px-4 py-2 rounded-xl bg-red-500 text-white font-semibold text-sm"
            >
              {currentFavorite ? "Edit Collection Entry" : "Add to Collection"}
            </button>

            {currentFavorite && (
              <p className="text-xs text-slate-500">
                Saved as <b>{currentFavorite.nickname}</b> in {currentFavorite.collectionType}
              </p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Base Stats</h2>
          <div className="flex flex-col gap-3">
            {pokemon.stats.map((stat) => (
              <div key={stat.name} className="grid grid-cols-12 items-center gap-3">
                <span className="col-span-3 text-xs font-bold text-slate-500">{stat.name}</span>
                <span className="col-span-2 text-sm font-bold text-slate-800">{stat.value}</span>
                <div className="col-span-7 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-2 bg-slate-800 rounded-full"
                    style={{ width: `${Math.min((stat.value / 180) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {showForm && (
          <div className="bg-white rounded-3xl border border-slate-100 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Capture to Collection</h2>
            <FavoritesForm
              defaultValues={
                currentFavorite
                  ? {
                      nickname: currentFavorite.nickname,
                      collectionType: currentFavorite.collectionType,
                      description: currentFavorite.description ?? "",
                    }
                  : undefined
              }
              onSubmit={handleSaveFavorite}
            />
          </div>
        )}
      </main>
    </div>
  );
}
