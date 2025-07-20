import { queryOptions, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { createSerializer, parseAsString } from "nuqs";

import { fetcher } from "@/api/axios";
import { API_URL } from "@/constants/apiUrls";
import { QUERY_KEYS } from "@/constants/keys";
import { renderQueryKey } from "@/lib/renderQueryKey";
import type { HookApiOptions, ResponsePaginationType } from "@/types";
import type { IPublisher } from "@/types/schema/publisher";

export const publisherSearchParams = {
  page: parseAsString.withDefault(""),
  limit: parseAsString.withDefault(""),
  order: parseAsString.withDefault(""),
  sort: parseAsString.withDefault(""),
  title: parseAsString.withDefault(""),
  country: parseAsString.withDefault(""),
};

const serialize = createSerializer(publisherSearchParams);

type PublisherFilters = {
  page?: string;
  limit?: string;
  order?: string;
  sort?: string;
  title?: string;
  country?: string;
};

type Parameters = { options?: HookApiOptions; filters?: PublisherFilters };

type PublisherReturn = ResponsePaginationType<IPublisher[]>;

export const publisherQueryOptions = ({ filters = {}, options }: Parameters) => {
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

export const usePublishers = (props: Parameters) => {
  return useQuery<PublisherReturn>(publisherQueryOptions(props));
};

export const useSuspensePublishers = (props: Parameters) => {
  return useSuspenseQuery<PublisherReturn>(publisherQueryOptions(props));
};
