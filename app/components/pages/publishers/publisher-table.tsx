import { useQueryStates } from "nuqs";

import { Table } from "@/components/table";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { publisherSearchParams, useSuspensePublishers } from "@/hooks/queries";

const head_tables = [
  { label: "ID", name: "id", sortable: true },
  { label: "Title", name: "title", sortable: true },
  { label: "Country", name: "country", sortable: true },
  { label: "Founding Date" },
  { label: "Website" },
  { label: "Image" },
];

const PublisherTable = () => {
  const [filters, setFilters] = useQueryStates(publisherSearchParams, {
    history: "replace",
  });

  const { data } = useSuspensePublishers({ filters });

  return (
    <Table
      heads={head_tables}
      setFilters={setFilters}
      filters={filters}
      pagination={data.data.pagination}
    >
      <TableBody>
        {data.data.items.map((publisher) => (
          <TableRow key={publisher.id}>
            <TableCell>{publisher.id}</TableCell>
            <TableCell>{publisher.title}</TableCell>
            <TableCell>{publisher.country}</TableCell>
            <TableCell>{new Date(publisher.founding_date).toLocaleDateString()}</TableCell>
            <TableCell>
              <a
                href={publisher.website_url}
                target="_blank"
                className="cursor-pointer text-indigo-400"
              >
                View
              </a>
            </TableCell>
            <TableCell>
              <img
                src={publisher.image_url}
                alt={publisher.title}
                className="h-12 w-12 rounded-full object-cover"
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PublisherTable;
