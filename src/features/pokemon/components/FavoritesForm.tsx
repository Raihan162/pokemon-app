"use client";

import { useForm } from "react-hook-form";
import { POKEMON_COLLECTION_TYPES } from "@/features/pokemon/constants";
import { FavoriteFormValues } from "@/features/favorites/types";

interface FavoritesFormProps {
  defaultValues?: FavoriteFormValues;
  onSubmit: (values: FavoriteFormValues) => void;
}

const initialValues: FavoriteFormValues = {
  nickname: "",
  collectionType: "Team",
  description: "",
};

export const FavoritesForm = ({ defaultValues, onSubmit }: FavoritesFormProps) => {
  const { register, handleSubmit, formState } = useForm<FavoriteFormValues>({
    defaultValues: defaultValues ?? initialValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-slate-700">Nickname</label>
        <input
          {...register("nickname", { required: "Nickname is required" })}
          className="border border-slate-200 rounded-xl px-3 py-2 text-sm"
          placeholder="Enter nickname"
        />
        {formState.errors.nickname && (
          <p className="text-xs text-red-500">{formState.errors.nickname.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-slate-700">Collection Type</label>
        <select
          {...register("collectionType", { required: "Collection type is required" })}
          className="border border-slate-200 rounded-xl px-3 py-2 text-sm"
        >
          {POKEMON_COLLECTION_TYPES.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-slate-700">Description</label>
        <textarea
          {...register("description")}
          className="border border-slate-200 rounded-xl px-3 py-2 text-sm min-h-20"
          placeholder="Optional notes"
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold text-sm"
      >
        Save to Collection
      </button>
    </form>
  );
};
