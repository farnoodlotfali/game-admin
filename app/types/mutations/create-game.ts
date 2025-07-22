import type { IGame } from "../schema/game";

export type CreateGameRequest = {
  title: string;
  release_date: string;
  "genre_ids[]": (number | string)[];
  "platform_ids[]": (number | string)[];
  publisher_id: number | string;
  cover_image?: object | null;
  description?: string | null | undefined;
};

export type CreateGameResponse = {
  game: IGame;
};
