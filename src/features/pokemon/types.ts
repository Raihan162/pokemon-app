export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListResult[];
}

export interface PokemonListResult {
  name: string;
  url: string;
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


export interface PokemonAbility {
  name: string;
  description: string;
  isHidden?: boolean;
}

export interface PokemonStats {
  hp: number;
  atk: number;
  def: number;
  spatk: number;
  spdef: number;
  spd: number;
}

export interface PokemonCardData {
  id: string;
  name: string;
  imageUrl: string;
  types: string[];
  collectionCount?: number;
  bgClass: string;
  darkBoxClass: string;
  description?: string;
  height?: string;
  weight?: string;
  abilities?: PokemonAbility[];
  stats?: PokemonStats;
  totalStats?: number;
}

export interface PokemonCardProps {
  pokemon: PokemonCardData;
  onClick?: () => void;
}
