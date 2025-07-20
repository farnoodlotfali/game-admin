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
import { renderQueryKey } from "@/lib/renderQueryKey";
import type { HookApiInfiniteOptions, HookApiOptions, ResponsePaginationType } from "@/types";
import type { IPublisher } from "@/types/schema/publisher";
import type { SearchParam } from "@/types/search-param";

type PublisherFilters = {
  page?: SearchParam;
  limit?: SearchParam;
  order?: SearchParam;
  sort?: SearchParam;
  q?: SearchParam;
  country?: SearchParam;
};

export const publisherSearchParams = {
  page: parseAsString.withDefault(""),
  limit: parseAsString.withDefault(""),
  order: parseAsString.withDefault(""),
  sort: parseAsString.withDefault(""),
  q: parseAsString.withDefault(""),
  country: parseAsString.withDefault(""),
};

const serialize = createSerializer(publisherSearchParams);

type Parameters = { options?: HookApiOptions; filters?: PublisherFilters };
type ParametersI = { options?: HookApiInfiniteOptions; filters?: PublisherFilters };

type PublisherReturn = ResponsePaginationType<IPublisher[]>;
//  queryOptions
export const publishersQueryOptions = ({ filters = {}, options }: Parameters) => {
  const queryParams = serialize(filters);
  return queryOptions({
    queryKey: renderQueryKey([QUERY_KEYS.publishers, filters]),
    queryFn: () =>
      fetcher
        .get<PublisherReturn>(`${API_URL.publisher.publishers}${queryParams}`)
        .then((res) => res),
    staleTime: 30 * 1000,
    ...options,
  });
};

// infinite queryOptions
export const publishersInfiniteQueryOptions = ({ filters, options }: ParametersI) => {
  return infiniteQueryOptions({
    queryKey: renderQueryKey([QUERY_KEYS.publishers, filters, { infinite: true }]),
    queryFn: ({ pageParam }) => {
      const queryParams = serialize({ ...filters, page: pageParam as PublisherFilters["page"] });
      return fetcher.get<PublisherReturn>(`${API_URL.publisher.publishers}${queryParams}`);
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
export const usePublishers = (props: Parameters) => {
  return useQuery<PublisherReturn>(publishersQueryOptions(props));
};

// suspense
export const useSuspensePublishers = (props: Parameters) => {
  return useSuspenseQuery<PublisherReturn>(publishersQueryOptions(props));
};

// normal Infinite platforms
export const useInfinitePublishers = (props: ParametersI) => {
  const infinitePublishers = useInfiniteQuery<PublisherReturn>(
    publishersInfiniteQueryOptions(props)
  );

  return infinitePublishers;
};
