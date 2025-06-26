import { Skeleton } from "./ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

type TableSkeletonProps = {
  headLength?: number;
  rows?: number;
  showPagination?: boolean;
};

export const TableSkeleton = ({
  headLength = 5,
  rows = 10,
  showPagination = true,
}: TableSkeletonProps) => {
  return (
    <>
      <Table className="border">
        <TableHeader className="bg-primary">
          <TableRow className=" pointer-events-none">
            {Array.from({ length: headLength }).map((_, i) => {
              return (
                <TableHead
                  key={i}
                  className="w-[100px] "
                  style={{
                    padding: `0px ${i * 2 + 5}px`,
                  }}
                >
                  <Skeleton className=" h-6 " />
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rows }).map((_, i) => {
            return (
              <TableRow key={i} className=" pointer-events-none">
                <TableCell colSpan={headLength}>
                  <Skeleton className=" h-6 w-full" />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {showPagination && <Skeleton className=" h-6 w-3/5 mx-auto mt-3" />}
    </>
  );
};
