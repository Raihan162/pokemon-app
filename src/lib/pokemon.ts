import { Pokemon } from "@/types";

export const POKEMON_LIST: Pokemon[] = [
  {
    id: "#001",
    name: "Bulbasaur",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
    types: ["Grass", "Poison"],
    bgClass: "bg-[#f1faf6] dark:bg-emerald-950/20 border-emerald-100/40 dark:border-emerald-900/30",
    darkBoxClass: "from-[#1d2721] to-[#0c100e]",
    description: "There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger as the Pokémon matures.",
    height: "0.7 m",
    weight: "6.9 kg",
    abilities: [
      {
        name: "Overgrow",
        description: "Powers up Grass-type moves when the Pokémon's HP is low."
      },
      {
        name: "Chlorophyll",
        description: "Boosts the Pokémon's Speed stat in harsh sunlight.",
        isHidden: true
      }
    ],
    stats: {
      hp: 45,
      atk: 49,
      def: 49,
      spatk: 65,
      spdef: 65,
      spd: 45
    },
    totalStats: 318
  },
  {
    id: "#004",
    name: "Charmander",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
    types: ["Fire"],
    bgClass: "bg-[#fdf6f2] dark:bg-orange-950/20 border-orange-100/40 dark:border-orange-900/30",
    darkBoxClass: "from-[#291e1a] to-[#120d0b]",
    description: "It has a preference for hot things. When it rains, steam is said to spout from the tip of its tail as a sign of its vitality.",
    height: "0.6 m",
    weight: "8.5 kg",
    abilities: [
      {
        name: "Blaze",
        description: "Powers up Fire-type moves when the Pokémon's HP is low."
      },
      {
        name: "Solar Power",
        description: "Boosts the Sp. Atk stat in harsh sunlight, but HP decreases every turn.",
        isHidden: true
      }
    ],
    stats: {
      hp: 39,
      atk: 52,
      def: 43,
      spatk: 60,
      spdef: 50,
      spd: 65
    },
    totalStats: 309
  },
  {
    id: "#006",
    name: "Charizard",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
    types: ["Fire", "Flying"],
    bgClass: "bg-[#fdf5f2] dark:bg-amber-950/20 border-orange-200/40 dark:border-orange-900/30",
    darkBoxClass: "from-[#2d1c16] to-[#0f0907]",
    description: "Spits fire that is hot enough to melt boulders. Known to cause forest fires unintentionally.",
    height: "1.7 m",
    weight: "90.5 kg",
    abilities: [
      {
        name: "Blaze",
        description: "Powers up Fire-type moves when the Pokémon's HP is low."
      },
      {
        name: "Solar Power",
        description: "Boosts the Sp. Atk stat in harsh sunlight, but HP decreases every turn.",
        isHidden: true
      }
    ],
    stats: {
      hp: 78,
      atk: 84,
      def: 78,
      spatk: 109,
      spdef: 85,
      spd: 100
    },
    totalStats: 534
  },
  {
    id: "#007",
    name: "Squirtle",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
    types: ["Water"],
    bgClass: "bg-[#f4f7fe] dark:bg-blue-950/20 border-blue-100/40 dark:border-blue-900/30",
    darkBoxClass: "from-[#1a232b] to-[#0c1014]",
    description: "When it retracts its long neck into its shell, it squirts out water with vigorous force to defend itself.",
    height: "0.5 m",
    weight: "9.0 kg",
    abilities: [
      {
        name: "Torrent",
        description: "Powers up Water-type moves when the Pokémon's HP is low."
      },
      {
        name: "Rain Dish",
        description: "Gradually regains HP in rainy weather.",
        isHidden: true
      }
    ],
    stats: {
      hp: 44,
      atk: 48,
      def: 65,
      spatk: 50,
      spdef: 64,
      spd: 43
    },
    totalStats: 314
  },
  {
    id: "#025",
    name: "Pikachu",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
    types: ["Electric"],
    bgClass: "bg-[#fefbf1] dark:bg-yellow-950/20 border-yellow-100/40 dark:border-yellow-900/30",
    darkBoxClass: "from-[#28261a] to-[#13120c]",
    description: "When several of these Pokémon gather, their electricity can build and cause lightning storms in the local area.",
    height: "0.4 m",
    weight: "6.0 kg",
    abilities: [
      {
        name: "Static",
        description: "The Pokémon is charged with static electricity, so contact with it may cause paralysis."
      },
      {
        name: "Lightning Rod",
        description: "Draws in all Electric-type moves to increase its own Sp. Atk.",
        isHidden: true
      }
    ],
    stats: {
      hp: 35,
      atk: 55,
      def: 40,
      spatk: 50,
      spdef: 50,
      spd: 90
    },
    totalStats: 320
  }
];
