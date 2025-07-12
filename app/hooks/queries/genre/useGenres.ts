import {
  infiniteQueryOptions,
  queryOptions,
  useInfiniteQuery,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";

import { fetcher } from "@/api/axios";
import { API_URL } from "@/constants/apiUrls";
import { QUERY_KEYS } from "@/constants/keys";
import { renderQueryKey } from "@/lib/renderQueryKey";
import type { HookApiInfiniteOptions, HookApiOptions, ResponsePaginationType } from "@/types";
import type { GenresResponse } from "@/types/genre-response";
import type { SearchParam } from "@/types/search-param";
import { filteringMethod } from "../../../lib/filteringMethod";

type GenreFilters = {
  page?: SearchParam;
  limit?: SearchParam;
  q?: SearchParam;
  order?: SearchParam;
  sort?: SearchParam;
};

type Parameters = { options?: HookApiOptions; filters?: GenreFilters };
type ParametersI = { options?: HookApiInfiniteOptions; filters?: GenreFilters };
type GenreReturn = ResponsePaginationType<GenresResponse>;

// queryOptions
export const genreQueryOptions = ({ filters, options }: Parameters) => {
  const queryParams = filteringMethod(filters);

  return queryOptions({
    queryKey: renderQueryKey([QUERY_KEYS.genres, filters]),
    queryFn: () =>
      fetcher.get<GenreReturn>(`${API_URL.genre.genres}${queryParams}`).then((res) => res),
    staleTime: 30 * 1000,
    ...options,
  });
};
// infinite queryOptions
export const genreInfiniteQueryOptions = ({ filters, options }: ParametersI) => {
  return infiniteQueryOptions({
    queryKey: renderQueryKey([QUERY_KEYS.genres, filters, { infinite: true }]),
    queryFn: ({ pageParam }) => {
      const queryParams = filteringMethod({ ...filters, page: pageParam });
      return fetcher.get<GenreReturn>(`${API_URL.genre.genres}${queryParams}`);
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
export const useGenres = (props: Parameters) => {
  const genres = useQuery<GenreReturn>(genreQueryOptions(props));

  return genres;
};

// suspense
export const useSuspenseGenres = (props: Parameters) => {
  const genres = useSuspenseQuery<GenreReturn>(genreQueryOptions(props));

  return genres;
};

// normal Infinite genres
export const useInfiniteGenres = (props: ParametersI) => {
  const infiniteGenres = useInfiniteQuery<GenreReturn>(genreInfiniteQueryOptions(props));

  return infiniteGenres;
};
