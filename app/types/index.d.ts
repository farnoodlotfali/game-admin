import type { QueryKey, UseQueryOptions } from "@tanstack/react-query";

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

export type HookApiOptions<T> = Omit<
  UseQueryOptions<ResponsePaginationType<T>, Error, ResponsePaginationType<T>, QueryKey>,
  "queryKey" | "queryFn"
>;
