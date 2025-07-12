import type {
  InfiniteData,
  QueryKey,
  UseInfiniteQueryOptions,
  UseQueryOptions,
} from "@tanstack/react-query";

export interface PaginationType<T> {
  items: T;
  pagination: {
    total: number;
    last_page: number;
    current_page: number;
  };
}

export interface ResponseType<T = []> {
  message: string;
  data: T;
}

export interface ResponsePaginationType<T = []> {
  message: string;
  data: PaginationType<T>;
}

export type HookApiOptions = Omit<
  UseQueryOptions<ResponsePaginationType<any>, Error, ResponsePaginationType<any>, QueryKey>,
  "queryKey" | "queryFn"
>;

export type HookApiInfiniteOptions = Omit<
  UseInfiniteQueryOptions<any, Error>,
  "queryKey" | "queryFn" | "getNextPageParam" | "initialPageParam"
>;
