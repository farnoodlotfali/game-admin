import { Suspense } from "react";
import type { Route } from "./+types/publishers";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { createLoader } from "nuqs";

import { CreateGenreDialog } from "@/components/dialog/create-genre-dialog";
import { GenresFilter } from "@/components/pages/genres/filter-box";
import { GenresTable } from "@/components/pages/genres/table";
import { TableSkeleton } from "@/components/table/table-skeleton";
import { genresQueryOptions, publisherSearchParams } from "@/hooks/queries";
import { getQueryClient } from "@/query-client";

export function meta() {
  return [
    { title: "Genre List" },
    {
      name: "description",
      content:
        "Browse and manage game publishers. Includes country, website, founding date, and more.",
    },
  ];
}

const loadSearchParams = createLoader(publisherSearchParams);

//ssr
export async function loader({ request }: Route.LoaderArgs) {
  const queryClient = getQueryClient();

  const filters = loadSearchParams(request);

  await queryClient.prefetchQuery(genresQueryOptions({ filters }));

  return {
    dehydratedState: dehydrate(queryClient),
    limit: filters.limit,
  };
}

//csr
export function clientLoader({ request }: Route.LoaderArgs) {
  const queryClient = getQueryClient();
  const filters = loadSearchParams(request);

  queryClient.prefetchQuery(genresQueryOptions({ filters }));

  return {
    dehydratedState: dehydrate(queryClient),
    limit: filters.limit,
  };
}

const GenresPage = ({ loaderData }: Route.ComponentProps) => {
  return (
    <HydrationBoundary state={loaderData.dehydratedState}>
      <div className="mb-4">
        <CreateGenreDialog />
      </div>
      <div>
        <GenresFilter />
        <Suspense fallback={<TableSkeleton rows={Number(loaderData.limit) || 10} />}>
          <GenresTable />
        </Suspense>
      </div>
    </HydrationBoundary>
  );
};

export default GenresPage;
