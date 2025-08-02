import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useQueryStates } from "nuqs";

import noImg from "@/assets/img/no-img.jpeg";
import { ButtonWithTooltip } from "@/components/button-with-tooltip";
import { EditGameDialog } from "@/components/dialog/edit-game-dialog";
import { ShowDescriptionDialog } from "@/components/dialog/show-description-dialog";
import { Table } from "@/components/table/table";
import { Button } from "@/components/ui/button";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { gameSearchParams, useSuspenseGames } from "@/hooks/queries";
import { useDialogModal } from "@/hooks/use-dialog-control";
import { handleDate } from "@/lib/handle-date";
import type { IGame } from "@/types/schema/game";

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
  {
    label: "Actions",
  },
];

export const GamesTable = () => {
  const { closeDialog, openDialog, show } = useDialogModal();

  const [selectedGame, setSelectedGame] = useState<IGame>();

  const [filters, setFilters] = useQueryStates(gameSearchParams, {
    history: "replace",
  });

  const { data } = useSuspenseGames({ filters });

  const handleShowDesc = (game: IGame) => {
    setSelectedGame(game);
    openDialog("desc");
  };
  const handleEdit = (game: IGame) => {
    setSelectedGame(game);
    openDialog("edit");
  };
  return (
    <>
      <EditGameDialog id={selectedGame?.id!} open={show === "edit"} onClose={closeDialog} />
      <ShowDescriptionDialog
        desc={selectedGame?.description}
        open={show === "desc"}
        onClose={closeDialog}
      />
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
                <TableCell>{handleDate(game.release_date, "dd MMMM yyyy")}</TableCell>
                <TableCell>{game.genres.map((gen) => gen.name).join(",")} </TableCell>
                <TableCell>{game.platforms.map((plat) => plat.name).join(",")} </TableCell>
                <TableCell className="min-w-[150px]">
                  <div className="size-10 overflow-hidden rounded-xl bg-gray-700 md:size-14">
                    <img
                      src={game?.cover_image ? game.cover_image : noImg}
                      alt={game.title}
                      className="mx-auto size-full object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell className="">
                  <Button
                    variant="link"
                    className="text-foreground block max-w-[200px] truncate text-xs"
                    onClick={() => handleShowDesc(game)}
                  >
                    {game.description}
                  </Button>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <ButtonWithTooltip content="Delete" disabled>
                      <Trash2 />
                    </ButtonWithTooltip>
                    <ButtonWithTooltip onClick={() => handleEdit(game)} content="Edit">
                      <Pencil />
                    </ButtonWithTooltip>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};
