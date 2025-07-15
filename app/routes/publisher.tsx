import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { createLoader } from "nuqs";

import CreatePublisherModal from "@/components/publishers/CreatePublisherModal";
import PublisherFilter from "@/components/publishers/PublisherFilter";
import PublisherTable from "@/components/publishers/PublisherTable";
import { TableSkeleton } from "@/components/table-skeleton";
import {
  publisherQueryOptions,
  publisherSearchParams,
} from "@/hooks/queries/publisher/usePublishers";
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
export async function loader({ request }: any) {
  const queryClient = serverQueryClient();
  const filters = loadSearchParams(request);

  await queryClient.prefetchQuery(publisherQueryOptions({ filters }));

  return {
    dehydratedState: dehydrate(queryClient),
    limit: filters.limit,
  };
}

//csr
export function clientLoader({ request }: any) {
  const filters = createLoader(publisherSearchParams)(request);

  clientQueryClient.prefetchQuery(publisherQueryOptions({ filters }));

  return {
    dehydratedState: dehydrate(clientQueryClient),
    limit: filters.limit,
  };
}

const PublisherPage = ({ loaderData }: any) => {
  return (
    <HydrationBoundary state={loaderData.dehydratedState}>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Publishers</h1>
        <CreatePublisherModal />
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

export default PublisherPage;
