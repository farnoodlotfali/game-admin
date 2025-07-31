import { Link } from "react-router";
import type { Route } from "./+types/about";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { gamesQueryOptions, useGames } from "@/hooks/queries";
import { getQueryClient } from "@/query-client";

export async function loader() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(gamesQueryOptions({}));
  return {
    dehydratedState: dehydrate(queryClient),
  };
}
export async function clientLoader() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(gamesQueryOptions({}));

  return {
    dehydratedState: dehydrate(queryClient),
  };
}

export default function About({ loaderData }: Route.ComponentProps) {
  return (
    <HydrationBoundary state={loaderData.dehydratedState}>
      <About1 />
    </HydrationBoundary>
  );
}

function About1() {
  const { data } = useGames({});

  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      {data?.data?.items?.map((item) => {
        return <div key={item.id}>{item.title}</div>;
      })}
      <Link to="/">home</Link>

      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
