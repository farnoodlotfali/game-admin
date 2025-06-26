import { queryOptions, useQuery, useSuspenseQuery } from "@tanstack/react-query";

import { filteringMethod } from "../../../lib/filteringMethod";
import { fetcher } from "@/api/axios";
import { API_URL } from "@/constants/apiUrls";
import { QUERY_KEYS } from "@/constants/keys";
import { renderQueryKey } from "@/lib/renderQueryKey";
import type { HookApiOptions, ResponsePaginationType } from "@/types";
import type { GamesResponse } from "@/types/game-response";
import type { SearchParam } from "@/types/search-param";


type GameFilters = {
  page?: SearchParam;
  limit?: SearchParam;
  q?: SearchParam;
  order?: SearchParam;
  sort?: SearchParam;
};

// queryOptions
export const gameQueryOptions = (
  options?: HookApiOptions<GamesResponse>,
  filters?: GameFilters
) => {
  const queryParams = filteringMethod(filters);

  return queryOptions({
    queryKey: renderQueryKey([QUERY_KEYS.games, filters]),
    queryFn: () =>
      fetcher
        .get<ResponsePaginationType<GamesResponse>>(`${API_URL.game.games}${queryParams}`)
        .then((res) => res),
    staleTime: 30 * 1000,
    ...options,
  });
};

// normal
export const useGames = (options?: HookApiOptions<GamesResponse>, filters?: GameFilters) => {
  const games = useQuery(gameQueryOptions(options, filters));

  return games;
};

// suspense
export const useSuspenseGames = (
  options?: HookApiOptions<GamesResponse>,
  filters?: GameFilters
) => {
  const games = useSuspenseQuery(gameQueryOptions(options, filters));

  return games;
};
