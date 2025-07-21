import { useQueryStates } from "nuqs";

import { Table } from "@/components/table/table";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { gameSearchParams, useSuspenseGames } from "@/hooks/queries";

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

export const GameTable = () => {
  const [filters, setFilters] = useQueryStates(gameSearchParams, {
    history: "replace",
  });

  const { data } = useSuspenseGames({ filters });

  return (
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
  );
};
