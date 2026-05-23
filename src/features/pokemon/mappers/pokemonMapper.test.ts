import { describe, expect, it } from "vitest";
import { mapPokemonDetail, mapPokemonListItem } from "@/features/pokemon/mappers/pokemonMapper";

describe("pokemonMapper", () => {
  it("maps list item using id extracted from API url", () => {
    const mapped = mapPokemonListItem({
      name: "pikachu",
      url: "https://pokeapi.co/api/v2/pokemon/25/",
    });

    expect(mapped).toEqual({
      id: 25,
      name: "Pikachu",
      imageUrl:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
      types: [],
    });
  });

  it("maps detail data including ordered types and normalized stats", () => {
    const mapped = mapPokemonDetail({
      id: 6,
      name: "charizard",
      height: 17,
      weight: 905,
      sprites: {
        other: {
          "official-artwork": {
            front_default: "https://img.test/charizard.png",
          },
        },
      },
      types: [
        { slot: 2, type: { name: "flying" } },
        { slot: 1, type: { name: "fire" } },
      ],
      stats: [
        { stat: { name: "hp" }, base_stat: 78 },
        { stat: { name: "attack" }, base_stat: 84 },
        { stat: { name: "defense" }, base_stat: 78 },
        { stat: { name: "special-attack" }, base_stat: 109 },
        { stat: { name: "special-defense" }, base_stat: 85 },
        { stat: { name: "speed" }, base_stat: 100 },
      ],
    });

    expect(mapped.name).toBe("Charizard");
    expect(mapped.types).toEqual(["Fire", "Flying"]);
    expect(mapped.heightMeters).toBe(1.7);
    expect(mapped.weightKg).toBe(90.5);
    expect(mapped.stats).toEqual([
      { name: "HP", value: 78 },
      { name: "ATK", value: 84 },
      { name: "DEF", value: 78 },
      { name: "SP.ATK", value: 109 },
      { name: "SP.DEF", value: 85 },
      { name: "SPD", value: 100 },
    ]);
  });
});
