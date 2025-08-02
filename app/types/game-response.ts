import type { IGame } from "./schema/game";
import type { IGenre } from "./schema/genre";
import type { IPlatform } from "./schema/platform";
import type { IPublisher } from "./schema/publisher";
import type { IScreenshot } from "./schema/screenshot";

export type GameResponse = IGame & {
  genres: IGenre[];
  platforms: IPlatform[];
  screenshots: IScreenshot[];
  publisher: IPublisher;
};
