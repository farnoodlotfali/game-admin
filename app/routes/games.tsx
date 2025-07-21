import { Suspense } from "react";
import type { Route } from "./+types/games";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { createLoader } from "nuqs";

import { GameFilterBox } from "@/components/pages/games/filter-box";
import { GamesTable } from "@/components/pages/games/table";
import { TableSkeleton } from "@/components/table/table-skeleton";
import { gameQueryOptions, gameSearchParams } from "@/hooks/queries";
import { getQueryClient } from "@/query-client";

export function meta() {
  return [
    { title: "Games List" },
    {
      name: "description",
      content: "Browse and manage games list.",
    },
  ];
}

const loadSearchParams = createLoader(gameSearchParams);
// ssr
export function loader({ request }: Route.LoaderArgs) {
  const queryClient = getQueryClient();

  const filters = loadSearchParams(request);

  queryClient.prefetchQuery(gameQueryOptions({ filters }));

  return {
    dehydratedState: dehydrate(queryClient),
    limit: filters.limit,
  };
}

// csr
export function clientLoader({ request }: Route.LoaderArgs) {
  const queryClient = getQueryClient();
  const filters = loadSearchParams(request);

  queryClient.prefetchQuery(gameQueryOptions({ filters }));

  return {
    dehydratedState: dehydrate(queryClient),
    limit: filters.limit,
  };
}

const Games = ({ loaderData }: Route.ComponentProps) => {
  return (
    <HydrationBoundary state={loaderData.dehydratedState}>
      <div>
        <GameFilterBox />
        <Suspense fallback={<TableSkeleton rows={Number(loaderData.limit) || 10} />}>
          <GamesTable />
        </Suspense>
      </div>
    </HydrationBoundary>
  );
};

export default Games;
