import { queryOptions, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { createParser, createSerializer, parseAsJson, parseAsString } from "nuqs/server";

import { fetcher } from "@/api/axios";
import { API_URL } from "@/constants/api-url";
import { QUERY_KEYS } from "@/constants/keys";
import { renderQueryKey } from "@/lib/render-query-key";
import type { HookApiOptions, ResponsePaginationType } from "@/types";
import type { GamesResponse } from "@/types/game-response";
import { genreArraySchema, type IGenre } from "@/types/schema/genre";
import { platformArraySchema } from "@/types/schema/platform";
import { publisherArraySchema } from "@/types/schema/publisher";
import type { SearchParam } from "@/types/search-param";

type GameFilters = {
  page?: SearchParam;
  limit?: SearchParam;
  q?: SearchParam;
  order?: SearchParam;
  sort?: SearchParam;
  releaseDateFrom?: SearchParam<Date>;
  releaseDateTo?: SearchParam<Date>;
  genre_id?: IGenre[] | null;
};

const parseAsStarRating = createParser({
  parse(queryValue) {
    return new Date(queryValue);
  },
  serialize(value) {
    return format(new Date(value), "yyyy-MM-dd");
  },
});

export const gameSearchParams = {
  page: parseAsString.withDefault(""),
  limit: parseAsString.withDefault(""),
  order: parseAsString.withDefault(""),
  sort: parseAsString.withDefault(""),
  q: parseAsString.withDefault(""),
  releaseDateFrom: parseAsStarRating,
  releaseDateTo: parseAsStarRating,
  genre_id: parseAsJson(genreArraySchema.parse).withDefault([]),
  platform_id: parseAsJson(platformArraySchema.parse).withDefault([]),
  publisher_id: parseAsJson(publisherArraySchema.parse).withDefault([]),
};

const serialize = createSerializer(gameSearchParams);

type Parameters = { options?: HookApiOptions; filters?: GameFilters };
type GameReturn = ResponsePaginationType<GamesResponse>;

// queryOptions
export const gameQueryOptions = ({ filters = {}, options }: Parameters) => {
  const queryParams = serialize(filters);
  return queryOptions({
    queryKey: renderQueryKey([QUERY_KEYS.games, filters]),
    queryFn: () =>
      fetcher.get<GameReturn>(`${API_URL.game.games}${queryParams}`).then((res) => res),
    staleTime: 30 * 1000,
    ...options,
  });
};

// normal
export const useGames = (props: Parameters) => {
  const games = useQuery<GameReturn>(gameQueryOptions(props));

  return games;
};

// suspense
export const useSuspenseGames = (props: Parameters) => {
  const games = useSuspenseQuery<GameReturn>(gameQueryOptions(props));

  return games;
};
