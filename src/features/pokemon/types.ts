export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
}

export interface PokemonApiType {
  slot: number;
  type: {
    name: string;
  };
}

export interface PokemonApiStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokemonApiResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    other?: {
      "official-artwork"?: {
        front_default: string | null;
      };
    };
  };
  types: PokemonApiType[];
  stats: PokemonApiStat[];
}

export interface PokemonListItem {
  id: number;
  name: string;
  imageUrl: string;
  types: string[];
}

export interface PokemonListPage {
  items: PokemonListItem[];
  totalCount: number;
}

export interface PokemonDetail {
  id: number;
  name: string;
  imageUrl: string;
  types: string[];
  stats: Array<{
    name: string;
    value: number;
  }>;
  heightMeters: number;
  weightKg: number;
}
