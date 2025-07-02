interface Monster {
  monster_id: number;
  name: string;
  image: string;
  level: string;
  is_mvp: number;
}

export interface Item {
  item_id: number;
  name: string;
  description_status: string;
  description_history: string;
  is_costume: number;
  weight: number;
  type: string;
  subtype: string | null;
  location: string;
  jobs: string | null;
  collection: string;
  icon: string;
  mobs: Monster[];
}

export interface Filter {
  searchTerm: string;
  type: string | null;
  location: string | null;
}
