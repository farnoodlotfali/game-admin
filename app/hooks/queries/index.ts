export { useGames, gameQueryOptions, useSuspenseGames, gameSearchParams } from "./game/use-games";
export {
  genreQueryOptions,
  useGenres,
  useSuspenseGenres,
  genreInfiniteQueryOptions,
  useInfiniteGenres,
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
  platformInfiniteQueryOptions,
  platformQueryOptions,
  useInfinitePlatforms,
  usePlatforms,
  useSuspensePlatforms,
} from "./platform/use-platforms";
