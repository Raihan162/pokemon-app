import { PokemonApiResponse, PokemonDetail, PokemonListItem } from "@/features/pokemon/types";

const toTitleCase = (value: string): string =>
  value.slice(0, 1).toUpperCase() + value.slice(1).toLowerCase();

const getOfficialArtwork = (pokemon: PokemonApiResponse): string =>
  pokemon.sprites.other?.["official-artwork"]?.front_default ??
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;

export const mapPokemonListItem = (pokemon: PokemonApiResponse): PokemonListItem => ({
  id: pokemon.id,
  name: toTitleCase(pokemon.name),
  imageUrl: getOfficialArtwork(pokemon),
  types: pokemon.types
    .sort((a, b) => a.slot - b.slot)
    .map((typeItem) => toTitleCase(typeItem.type.name)),
});

const statOrder = ["hp", "attack", "defense", "special-attack", "special-defense", "speed"] as const;

const statLabelMap: Record<(typeof statOrder)[number], string> = {
  hp: "HP",
  attack: "ATK",
  defense: "DEF",
  "special-attack": "SP.ATK",
  "special-defense": "SP.DEF",
  speed: "SPD",
};

export const mapPokemonDetail = (pokemon: PokemonApiResponse): PokemonDetail => {
  const statsByName = new Map(pokemon.stats.map((item) => [item.stat.name, item.base_stat]));

  return {
    id: pokemon.id,
    name: toTitleCase(pokemon.name),
    imageUrl: getOfficialArtwork(pokemon),
    types: pokemon.types
      .sort((a, b) => a.slot - b.slot)
      .map((typeItem) => toTitleCase(typeItem.type.name)),
    stats: statOrder.map((name) => ({
      name: statLabelMap[name],
      value: statsByName.get(name) ?? 0,
    })),
    heightMeters: pokemon.height / 10,
    weightKg: pokemon.weight / 10,
  };
};
