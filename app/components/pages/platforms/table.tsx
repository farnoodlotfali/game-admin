import { useQueryStates } from "nuqs";

import { Table } from "@/components/table/table";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { platformsSearchParams, useSuspensePlatforms } from "@/hooks/queries";

const head_tables = [
  { label: "ID", name: "id", sortable: true },
  { label: "Name", name: "name", sortable: true },
  { label: "Description" },
];

export const PlatformsTable = () => {
  const [filters, setFilters] = useQueryStates(platformsSearchParams, {
    history: "replace",
  });

  const { data } = useSuspensePlatforms({ filters });

  return (
    <Table
      heads={head_tables}
      setFilters={setFilters}
      filters={filters}
      pagination={data.data.pagination}
    >
      <TableBody>
        {data.data.items.map((platform) => (
          <TableRow key={platform.id}>
            <TableCell>{platform.id}</TableCell>
            <TableCell>{platform.name}</TableCell>
            <TableCell>{platform.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
