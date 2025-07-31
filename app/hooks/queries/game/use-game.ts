import { queryOptions, useQuery, useSuspenseQuery } from "@tanstack/react-query";

import { fetcher } from "@/api/axios";
import { API_URL } from "@/constants/api-url";
import { QUERY_KEYS } from "@/constants/keys";
import { renderQueryKey } from "@/lib/render-query-key";
import type { HookApiSimpleOptions, ResponseType } from "@/types";
import type { GameResponse } from "@/types/game-response";

type Parameters = { options?: HookApiSimpleOptions; id: number | string };
type GameReturn = ResponseType<GameResponse>;

// queryOptions
export const gameQueryOptions = ({ id, options }: Parameters) => {
  return queryOptions({
    queryKey: renderQueryKey([QUERY_KEYS.games, id]),
    queryFn: () => fetcher.get<GameReturn>(`${API_URL.game.games}/${id}`).then((res) => res),
    staleTime: 30 * 1000,
    ...options,
  });
};

// normal
export const useGame = (props: Parameters) => {
  const games = useQuery<GameReturn>(gameQueryOptions(props));

  return games;
};

// suspense
export const useSuspenseGame = (props: Parameters) => {
  const games = useSuspenseQuery<GameReturn>(gameQueryOptions(props));

  return games;
};
