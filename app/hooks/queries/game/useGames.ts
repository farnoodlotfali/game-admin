import { queryOptions, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { createSerializer, parseAsJson, parseAsString } from "nuqs";

import { fetcher } from "@/api/axios";
import { API_URL } from "@/constants/apiUrls";
import { QUERY_KEYS } from "@/constants/keys";
import { renderQueryKey } from "@/lib/renderQueryKey";
import type { HookApiOptions, ResponsePaginationType } from "@/types";
import type { GamesResponse } from "@/types/game-response";
import { genreArraySchema, type IGenre } from "@/types/schema/genre";
import type { SearchParam } from "@/types/search-param";

type GameFilters = {
  page?: SearchParam;
  limit?: SearchParam;
  q?: SearchParam;
  order?: SearchParam;
  sort?: SearchParam;
  releaseDateFrom?: SearchParam;
  releaseDateTo?: SearchParam;
  genre_id?: IGenre[] | null;
};

export const gameSearchParams = {
  page: parseAsString.withDefault(""),
  limit: parseAsString.withDefault(""),
  order: parseAsString.withDefault(""),
  sort: parseAsString.withDefault(""),
  q: parseAsString.withDefault(""),
  releaseDateFrom: parseAsString.withDefault(""),
  releaseDateTo: parseAsString.withDefault(""),
  genre_id: parseAsJson(genreArraySchema.parse).withDefault([]),
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
