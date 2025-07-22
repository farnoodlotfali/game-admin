import type { IGenre } from "../schema/genre";

export type CreateGenreRequest = {
  name: string;
  description: string;
};

export type CreateGenreResponse = {
  genre: IGenre;
};
