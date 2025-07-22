export { useGames, gameQueryOptions, useSuspenseGames, gameSearchParams } from "./game/use-games";
export {
  genresQueryOptions,
  useGenres,
  useSuspenseGenres,
  genresInfiniteQueryOptions,
  useInfiniteGenres,
  genresSearchParams,
} from "./genre/use-genres";

export {
  usePublishers,
  useSuspensePublishers,
  publishersQueryOptions,
  publisherSearchParams,
  publishersInfiniteQueryOptions,
  useInfinitePublishers,
} from "./publisher/use-publishers";
export {
  platformsInfiniteQueryOptions,
  platformsQueryOptions,
  useInfinitePlatforms,
  usePlatforms,
  useSuspensePlatforms,
  platformsSearchParams,
} from "./platform/use-platforms";
