import { Suspense } from "react";
import type { Route } from "./+types/publishers";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { createLoader } from "nuqs";

import { CreatePlatformDialog } from "@/components/dialog/create-platform-dialog";
import { PlatformsFilter } from "@/components/pages/platforms/filter-box";
import { PlatformsTable } from "@/components/pages/platforms/table";
import { TableSkeleton } from "@/components/table/table-skeleton";
import { platformsQueryOptions, platformsSearchParams } from "@/hooks/queries";
import { getQueryClient } from "@/query-client";

export function meta() {
  return [
    { title: "Platform List" },
    {
      name: "description",
      content:
        "Browse and manage game publishers. Includes country, website, founding date, and more.",
    },
  ];
}

const loadSearchParams = createLoader(platformsSearchParams);

//ssr
export async function loader({ request }: Route.LoaderArgs) {
  const queryClient = getQueryClient();

  const filters = loadSearchParams(request);

  await queryClient.prefetchQuery(platformsQueryOptions({ filters }));

  return {
    dehydratedState: dehydrate(queryClient),
    limit: filters.limit,
  };
}

//csr
export function clientLoader({ request }: Route.LoaderArgs) {
  const queryClient = getQueryClient();
  const filters = loadSearchParams(request);

  queryClient.prefetchQuery(platformsQueryOptions({ filters }));

  return {
    dehydratedState: dehydrate(queryClient),
    limit: filters.limit,
  };
}

const PublishersPage = ({ loaderData }: Route.ComponentProps) => {
  return (
    <HydrationBoundary state={loaderData.dehydratedState}>
      <div className="mb-4">
        <CreatePlatformDialog />
      </div>
      <div>
        <PlatformsFilter />
        <Suspense fallback={<TableSkeleton rows={Number(loaderData.limit) || 10} />}>
          <PlatformsTable />
        </Suspense>
      </div>
    </HydrationBoundary>
  );
};

export default PublishersPage;
