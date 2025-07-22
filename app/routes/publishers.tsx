import { Suspense } from "react";
import type { Route } from "./+types/publishers";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { createLoader } from "nuqs";

import { CreatePublisherDialog } from "@/components/dialog/create-publisher-dialog";
import { PublishersFilter } from "@/components/pages/publishers/filter-box";
import { PublishersTable } from "@/components/pages/publishers/table";
import { TableSkeleton } from "@/components/table/table-skeleton";
import { publisherSearchParams, publishersQueryOptions } from "@/hooks/queries";
import { getQueryClient } from "@/query-client";

export function meta() {
  return [
    { title: "Publisher List" },
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

  await queryClient.prefetchQuery(publishersQueryOptions({ filters }));

  return {
    dehydratedState: dehydrate(queryClient),
    limit: filters.limit,
  };
}

//csr
export function clientLoader({ request }: Route.LoaderArgs) {
  const queryClient = getQueryClient();
  const filters = loadSearchParams(request);

  queryClient.prefetchQuery(publishersQueryOptions({ filters }));

  return {
    dehydratedState: dehydrate(queryClient),
    limit: filters.limit,
  };
}

const PublishersPage = ({ loaderData }: Route.ComponentProps) => {
  return (
    <HydrationBoundary state={loaderData.dehydratedState}>
      <div className="mb-4">
        <CreatePublisherDialog />
      </div>
      <div>
        <PublishersFilter />
        <Suspense fallback={<TableSkeleton rows={Number(loaderData.limit) || 10} />}>
          <PublishersTable />
        </Suspense>
      </div>
    </HydrationBoundary>
  );
};

export default PublishersPage;
