import { z } from "zod";
import { POKEMON_COLLECTION_TYPES } from "@/features/pokemon/constants";

export const favoriteFormSchema = z.object({
  nickname: z
    .string()
    .trim()
    .min(1, "Nickname is required")
    .max(30, "Nickname must be at most 30 characters"),
  collectionType: z.enum(POKEMON_COLLECTION_TYPES),
  description: z
    .string()
    .trim()
    .max(140, "Description must be at most 140 characters")
    .optional()
    .or(z.literal("")),
});

export type FavoriteFormSchemaInput = z.input<typeof favoriteFormSchema>;
