import {
  infiniteQueryOptions,
  queryOptions,
  useInfiniteQuery,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { createSerializer, parseAsString } from "nuqs";

import { fetcher } from "@/api/axios";
import { API_URL } from "@/constants/api-url";
import { QUERY_KEYS } from "@/constants/keys";
import { renderQueryKey } from "@/lib/render-query-key";
import type { HookApiInfiniteOptions, HookApiOptions, ResponsePaginationType } from "@/types";
import type { PlatformsResponse } from "@/types/platform-response";
import type { SearchParam } from "@/types/search-param";

type PlatformFilters = {
  page?: SearchParam;
  limit?: SearchParam;
  q?: SearchParam;
  order?: SearchParam;
  sort?: SearchParam;
};

export const platformsSearchParams = {
  page: parseAsString.withDefault(""),
  limit: parseAsString.withDefault(""),
  order: parseAsString.withDefault(""),
  sort: parseAsString.withDefault(""),
  q: parseAsString.withDefault(""),
};

const serialize = createSerializer(platformsSearchParams);

type Parameters = { options?: HookApiOptions; filters?: PlatformFilters };
type ParametersI = { options?: HookApiInfiniteOptions; filters?: PlatformFilters };
type PlatformReturn = ResponsePaginationType<PlatformsResponse>;

// queryOptions
export const platformsQueryOptions = ({ filters = {}, options }: Parameters) => {
  const queryParams = serialize(filters);

  return queryOptions({
    queryKey: renderQueryKey([QUERY_KEYS.platforms, filters]),
    queryFn: () =>
      fetcher.get<PlatformReturn>(`${API_URL.platform.platforms}${queryParams}`).then((res) => res),
    staleTime: 30 * 1000,
    ...options,
  });
};
// infinite queryOptions
export const platformsInfiniteQueryOptions = ({ filters, options }: ParametersI) => {
  return infiniteQueryOptions({
    queryKey: renderQueryKey([QUERY_KEYS.platforms, filters, { infinite: true }]),
    queryFn: ({ pageParam }) => {
      const queryParams = serialize({ ...filters, page: pageParam as PlatformFilters["page"] });
      return fetcher.get<PlatformReturn>(`${API_URL.platform.platforms}${queryParams}`);
    },
    initialPageParam: filters?.page ?? 1,
    getNextPageParam: (lastPage) => {
      return lastPage.data.pagination.current_page !== lastPage.data.pagination.last_page
        ? lastPage.data.pagination.current_page + 1
        : undefined;
    },
    staleTime: 30 * 1000,
    ...options,
  });
};

// normal
export const usePlatforms = (props: Parameters) => {
  const platforms = useQuery<PlatformReturn>(platformsQueryOptions(props));

  return platforms;
};

// suspense
export const useSuspensePlatforms = (props: Parameters) => {
  const platforms = useSuspenseQuery<PlatformReturn>(platformsQueryOptions(props));

  return platforms;
};

// normal Infinite platforms
export const useInfinitePlatforms = (props: ParametersI) => {
  const infinitePlatforms = useInfiniteQuery<PlatformReturn>(platformsInfiniteQueryOptions(props));

  return infinitePlatforms;
};
