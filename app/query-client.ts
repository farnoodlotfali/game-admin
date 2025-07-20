import {
  defaultShouldDehydrateQuery,
  isServer,
  keepPreviousData,
  QueryClient,
} from "@tanstack/react-query";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // 20 seconds
        staleTime: 20 * 1000,
        refetchOnWindowFocus: false,
        retry: 1,
        retryDelay: 1.5 * 1000,
        networkMode: "always",
        placeholderData: keepPreviousData,
      },
      dehydrate: {
        // include pending queries in dehydration
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) || query.state.status === "pending",
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
