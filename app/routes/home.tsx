import { Suspense } from "react";
import type { Route } from "./+types/home";
import { zodResolver } from "@hookform/resolvers/zod";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";
import { createLoader, useQueryStates } from "nuqs";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { MultiGenresChooser } from "@/components/choosers/multi-genres-chooser";
import { FormInputs } from "@/components/form";
import { Table } from "@/components/table";
import { TableSkeleton } from "@/components/table-skeleton";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Form } from "@/components/ui/form";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { INPUT_TYPES } from "@/constants/input-types";
import { gameQueryOptions, gameSearchParams, useSuspenseGames } from "@/hooks/queries";
import { clientQueryClient } from "@/lib/queryClient";
import type { FormInputsType } from "@/types/form-inputs-type";
import { genreSchema } from "@/types/schema/genre";

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
// export function loader({ request }: Route.LoaderArgs) {
//   const queryClient = serverQueryClient();
//   const filters = loadSearchParams(request);

//   queryClient.prefetchQuery(gameQueryOptions({ filters }));

//   return {
//     dehydratedState: dehydrate(queryClient),
//     limit: filters.limit,
//   };
// }

// csr
export function clientLoader({ request }: Route.LoaderArgs) {
  const filters = loadSearchParams(request);

  clientQueryClient.prefetchQuery(gameQueryOptions({ filters }));

  return {
    dehydratedState: dehydrate(clientQueryClient),
    limit: filters.limit,
  };
}

const formSchema = z.object({
  // q: z.string().min(2, {
  //   message: "Game title must be at least 2 characters.",
  // }),
  releaseDateFrom: z.string(),
  releaseDateTo: z.string(),
  genre_id: z.array(genreSchema).min(1, { message: "At least one genre is required." }),
});

const FilterBox = () => {
  const [filters, setFilters] = useQueryStates(gameSearchParams, {
    history: "push",
    // history: "replace",
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: filters,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setFilters({
      // ...values,
      // releaseDateFrom: dateFilterHelper(values?.releaseDateFrom),
      // releaseDateTo: dateFilterHelper(values?.releaseDateTo),
      genre_id: values?.genre_id,
      // genre_id: JSON.stringify(values?.genre_id),
      // genre_id: genreArraySchema.parse(values?.genre_id),
    });
  }

  const inputs: FormInputsType[] = [
    {
      inputType: INPUT_TYPES.TEXT,
      label: "Game Title",
      name: "q",
      gridClassName: " md:col-span-3",
      props: {
        placeholder: "Game Title",
      },
    },
    {
      inputType: INPUT_TYPES.DATE,
      label: "Release Date From",
      name: "releaseDateFrom",
      gridClassName: " md:col-span-3",
    },
    {
      inputType: INPUT_TYPES.DATE,
      label: "Release Date To",
      name: "releaseDateTo",
      gridClassName: " md:col-span-3",
    },
    {
      inputType: INPUT_TYPES.CUSTOM,
      customView: MultiGenresChooser,
      label: "Genres",
      name: "genre_id",
      gridClassName: " md:col-span-3",
    },
  ];

  return (
    <Collapsible className="group/collapsible mb-3">
      <CollapsibleTrigger asChild>
        <Button variant="secondary" className="w-full">
          Filters
          <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="bg-secondary my-2 rounded-lg p-4">
            <FormInputs control={form.control} inputs={inputs} />

            <Button className="mt-3" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </CollapsibleContent>
    </Collapsible>
  );
};

const Home = ({ loaderData }: Route.ComponentProps) => {
  return (
    <HydrationBoundary state={loaderData.dehydratedState}>
      <div>
        {/* <div className="flex min-h-svh flex-col items-center justify-center"> */}
        <FilterBox />
        {/* <MultiGenresChooser /> */}
        <Suspense fallback={<TableSkeleton rows={Number(loaderData.limit) || 10} />}>
          <Home1 />
        </Suspense>
      </div>
    </HydrationBoundary>
  );
};

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

function Home1() {
  const [filters, setFilters] = useQueryStates(gameSearchParams, {
    history: "replace",
  });

  const { data } = useSuspenseGames({ filters });

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
