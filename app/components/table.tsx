import type { PropsWithChildren } from "react";
import { ArrowDownNarrowWide, ArrowUpNarrowWide, ListFilter } from "lucide-react";

import { PaginationControl } from "./pagination-control";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import {
  Table as ShadCnTable,
  TableCaption,
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
    page?: string;
    limit?: string;
  };
  setFilters: (filters: { sort?: string; order?: string; page?: string; limit?: string }) => void;
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

  const handlePerPage = (value: string) => {
    setFilters({
      limit: value,
      page: "1",
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
                      {filters?.sort !== he.name && <ListFilter />}
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

      <div className="flex flex-col gap-3 items-center md:flex-row mt-3">
        <div className="flex items-center gap-1">
          <span className="text-[6px]">Per Page</span>
          <Select value={filters?.limit || "10"} onValueChange={(e) => handlePerPage(e)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Per Page" className="text-[5px]" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="15">15</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <PaginationControl setFilters={setFilters} pagination={pagination} />
      </div>
    </>
  );
};
