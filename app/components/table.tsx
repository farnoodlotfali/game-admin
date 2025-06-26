import type { PropsWithChildren } from "react";
import { ArrowDownNarrowWide, ArrowUpNarrowWide } from "lucide-react";

import { PaginationControl } from "./pagination-control";
import { Button } from "./ui/button";
import {
  Table as ShadCnTable,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { PaginationType } from "@/types";

type TableProps = {
  heads: {
    label: string;
    name?: string;
    sortable?: boolean;
  }[];
  filters?: {
    sort?: string;
    order?: string;
  };
  setFilters: (filters: { sort?: string; order?: string; page?: string }) => void;
  pagination: PaginationType<any>["pagination"];
  caption?: string;
};

export const Table: React.FC<PropsWithChildren<TableProps>> = ({
  heads,
  filters,
  setFilters,
  children,
  caption,
  pagination,
}) => {
  const handleSort = (sort: string) => {
    const currentDirection = filters?.order;
    const newDirection = currentDirection === "asc" ? "desc" : "asc";
    setFilters({
      sort: sort,
      order: newDirection,
    });
  };
  return (
    <>
      <ShadCnTable className="border">
        {caption && <TableCaption>{caption}</TableCaption>}
        <TableHeader className="bg-primary">
          <TableRow>
            {heads.map((he) => {
              return (
                <TableHead key={he.label}>
                  {he.sortable ? (
                    <Button variant="ghost" onClick={() => handleSort(he.name!)}>
                      {he.label}
                      {filters?.sort === he.name && (
                        <>
                          {filters?.order === "asc" ? (
                            <ArrowUpNarrowWide />
                          ) : (
                            <ArrowDownNarrowWide />
                          )}
                        </>
                      )}
                    </Button>
                  ) : (
                    he.label
                  )}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        {children}
      </ShadCnTable>

      <PaginationControl setFilters={setFilters} pagination={pagination} />
    </>
  );
};
