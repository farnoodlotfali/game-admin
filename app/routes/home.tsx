import { Suspense } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/home";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { User2Icon } from "lucide-react";
import { createLoader, parseAsString, useQueryStates } from "nuqs";
import { toast } from "sonner";

import { ModeToggle } from "@/components/mode-toggle";
import { Table } from "@/components/table";
import { TableSkeleton } from "@/components/table-skeleton";
import { Button } from "@/components/ui/button";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { gameQueryOptions, useSuspenseGames } from "@/hooks/queries";
import { clientQueryClient, serverQueryClient } from "@/lib/queryClient";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const coordinatesSearchParams = {
  page: parseAsString.withDefault(""),
  limit: parseAsString.withDefault(""),
  order: parseAsString.withDefault(""),
  sort: parseAsString.withDefault(""),
  q: parseAsString.withDefault(""),
};

const loadSearchParams = createLoader(coordinatesSearchParams);

// ssr
export function loader({ request }: Route.LoaderArgs) {
  const queryClient = serverQueryClient();
  const filter = loadSearchParams(request);

  queryClient.prefetchQuery(gameQueryOptions({}, filter));

  return {
    dehydratedState: dehydrate(queryClient),
    limit: filter.limit,
  };
}

// csr
export function clientLoader({ request }: Route.LoaderArgs) {
  const filter = loadSearchParams(request);

  clientQueryClient.prefetchQuery(gameQueryOptions({}, filter));

  return {
    dehydratedState: dehydrate(clientQueryClient),
    limit: filter.limit,
  };
}

const head_tables = [
  {
    label: "ID",
    name: "game_id",
    sortable: true,
  },
  {
    label: "Title",
    name: "title",
    sortable: true,
  },
  {
    label: "Publisher",
    name: "publisher",
    sortable: true,
  },
  {
    label: "Release Date",
    name: "release_date",
    sortable: true,
  },
  {
    label: "Genres",
  },
  {
    label: "Platforms",
  },
  {
    label: "Description",
  },
];

const Home = ({ loaderData }: Route.ComponentProps) => {
  return (
    <HydrationBoundary state={loaderData.dehydratedState}>
      <div>
        {/* <div className="flex min-h-svh flex-col items-center justify-center"> */}
        <Button
          onClick={() => {
            // toast("Event has been created", {
            //   description: "Sunday, December 03, 2023 at 9:00 AM",
            //   action: {
            //     label: "Undo",
            //     onClick: () => console.log("Undo"),
            //   },
            //   icon: <User2Icon />,
            //   duration: 1222000,
            //   closeButton: true,
            //   // cancel: <Button>1212</Button>,
            //   classNames:{
            //     closeButton:'!text-accent-foreground !border-accent-foreground/30 hover:!bg-accent !border'
            //   },
            //   // dismissible:true

            // });
            toast.warning("Event has been created.");
          }}
        >
          <User2Icon className="hover:!bg-accent hover:!text-accent-foreground dark:hover:!bg-accent/50" />
        </Button>
        <Suspense fallback={<TableSkeleton rows={Number(loaderData.limit) || 10} />}>
          <Home1 />
        </Suspense>
        <ModeToggle />
        <Link to="/about">aboutabout</Link>
      </div>
    </HydrationBoundary>
  );
};

function Home1() {
  const [filters, setFilters] = useQueryStates(coordinatesSearchParams, {
    history: "replace",
  });

  const { data } = useSuspenseGames({}, filters);

  return (
    <>
      <Table
        heads={head_tables}
        setFilters={setFilters}
        filters={filters}
        pagination={data?.data?.pagination}
      >
        <TableBody>
          {data?.data?.items?.map((game) => {
            return (
              <TableRow key={game.id}>
                <TableCell>{game.id} </TableCell>
                <TableCell>{game.title} </TableCell>
                <TableCell>{game.publisher.title} </TableCell>
                <TableCell>
                  {new Date(game.release_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                  })}
                </TableCell>
                <TableCell>{game.genres.map((gen) => gen.name).join(",")} </TableCell>
                <TableCell>{game.platforms.map((plat) => plat.name).join(",")} </TableCell>
                <TableCell>{game.description} </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}

export default Home;
