import { Suspense } from "react";
import type { Route } from "./+types/publishers";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { createLoader } from "nuqs";

import { CreatePublisherDialog } from "@/components/dialog/create-publisher-dialog";
import PublisherFilter from "@/components/pages/publishers/publisher-filter";
import PublisherTable from "@/components/pages/publishers/publisher-table";
import { TableSkeleton } from "@/components/table-skeleton";
import { publisherQueryOptions, publisherSearchParams } from "@/hooks/queries";
import { clientQueryClient, serverQueryClient } from "@/lib/queryClient";

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

//ssr
const loadSearchParams = createLoader(publisherSearchParams);
export async function loader({ request }: Route.LoaderArgs) {
  const queryClient = serverQueryClient();
  const filters = loadSearchParams(request);

  await queryClient.prefetchQuery(publisherQueryOptions({ filters }));

  return {
    dehydratedState: dehydrate(queryClient),
    limit: filters.limit,
  };
}

//csr
export function clientLoader({ request }: Route.LoaderArgs) {
  const filters = createLoader(publisherSearchParams)(request);

  clientQueryClient.prefetchQuery(publisherQueryOptions({ filters }));

  return {
    dehydratedState: dehydrate(clientQueryClient),
    limit: filters.limit,
  };
}

const PublishersPage = ({ loaderData }: Route.ComponentProps) => {
  return (
    <HydrationBoundary state={loaderData.dehydratedState}>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Publishers</h1>
        <CreatePublisherDialog />
      </div>
      <div>
        <PublisherFilter />
        <Suspense fallback={<TableSkeleton rows={Number(loaderData.limit) || 10} />}>
          <PublisherTable />
        </Suspense>
      </div>
    </HydrationBoundary>
  );
};

export default PublishersPage;
