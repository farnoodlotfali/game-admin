import { useQueryStates } from "nuqs";

import noImg from "@/assets/img/no-img.jpeg";
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
    label: "Cover Image",
  },
  {
    label: "Description",
  },
];

export const GamesTable = () => {
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
              <TableCell className="min-w-[150px] ">
                <img
                  src={game?.cover_image ? game.cover_image : noImg}
                  alt={game.title}
                  className="size-10 rounded-full object-cover md:size-14 mx-auto"
                />
              </TableCell>
              <TableCell  >{game.description} </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
