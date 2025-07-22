import { useQueryStates } from "nuqs";

import { Table } from "@/components/table/table";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { genresSearchParams, useSuspenseGenres } from "@/hooks/queries";

const head_tables = [
  { label: "ID", name: "id", sortable: true },
  { label: "Name", name: "name", sortable: true },
  { label: "Description" },
];

export const GenresTable = () => {
  const [filters, setFilters] = useQueryStates(genresSearchParams, {
    history: "replace",
  });

  const { data } = useSuspenseGenres({ filters });

  return (
    <Table
      heads={head_tables}
      setFilters={setFilters}
      filters={filters}
      pagination={data.data.pagination}
    >
      <TableBody>
        {data.data.items.map((genre) => (
          <TableRow key={genre.id}>
            <TableCell>{genre.id}</TableCell>
            <TableCell>{genre.name}</TableCell>
            <TableCell>{genre.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
