import { useQueryStates } from "nuqs";

import noImg from "@/assets/img/no-img.jpeg";
import { Table } from "@/components/table/table";
import { Button } from "@/components/ui/button";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { publisherSearchParams, useSuspensePublishers } from "@/hooks/queries";
import { handleDate } from "@/lib/handle-date";

const head_tables = [
  { label: "ID", name: "id", sortable: true },
  { label: "Title", name: "title", sortable: true },
  { label: "Country", name: "country", sortable: true },
  { label: "Founding Date", name: "founding_date", sortable: true },
  { label: "Website" },
  { label: "Image" },
];

export const PublishersTable = () => {
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
            <TableCell>{handleDate(publisher.founding_date, "dd MMMM yyyy")}</TableCell>
            <TableCell>
              {publisher?.website_url ? (
                <Button variant="link" asChild>
                  <a href={publisher.website_url} target="_blank">
                    View
                  </a>
                </Button>
              ) : (
                "-"
              )}
            </TableCell>
            <TableCell>
              <img
                src={publisher?.image ? publisher.image : noImg}
                alt={publisher.title}
                className="size-10 rounded-full object-cover md:size-14"
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
