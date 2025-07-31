import type { IGame } from "../schema/game";

export type EditGameRequest = {
  id: number;
  data: {
    title: string;
    release_date: string;
    "genre_ids[]": (number | string)[];
    "platform_ids[]": (number | string)[];
    publisher_id: number | string;
    cover_image?: object | null | undefined;
    description?: string | null | undefined;
  };
};

export type EditGameResponse = {
  game: IGame;
};
