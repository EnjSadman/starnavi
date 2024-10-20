//this file for types of data. If there more types I prefer to split this file

export type Person = {
  id: number,
  name: string,
  height: string,
  mass: string,
  hair_color: string,
  eye_color: string,
  birth_year: string,
  gender: string,
  homeworld: number,
  films: number[],
  species: number[],
  vehicle: number[],
  starships: number[],
  created: string,
  edited: string,
  url: string,
}

export type Starships = {
  id: number,
  name: string,
  model: string,
  manufacturer: string,
  cost_in_credits: string,
  length: string,
  max_atmosphering_speed: string,
  crew: string,
  passengers: string,
  cargo_capacity: string,
  consumables: string,
  hyperdrive_rating: string,
  MGLT: string,
  starship_class: string,
  pilots: number[],
  films: number[],
  created: string,
  edited: string,
  url: string,
}

export type Films = {
  id: number,
  title: string,
  episode_id: number,
  opening_crawl: string,
  director: string,
  producer: string,
  release_date: string,
  characters: number[],
  planets: number[],
  starships: number[],
  vehicles: number[],
  species: number[],
  created: string,
  edited: string,
  url: string,
}

export type ResponseMultiple = {
  count: number,
  next: string | null,
  previous: string | null,
  results: Person[] | Starships[] | Films[]
}