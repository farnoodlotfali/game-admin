import { cache } from "react";
import { keepPreviousData, QueryClient } from "@tanstack/react-query";

export const clientQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 20 seconds
      staleTime: 20 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
      retryDelay: 1.5 * 1000,
      networkMode: "always",
      placeholderData: keepPreviousData,
      // placeholderData: (prev:any) => prev
    },
  },
});

export const serverQueryClient = cache(() => clientQueryClient);
