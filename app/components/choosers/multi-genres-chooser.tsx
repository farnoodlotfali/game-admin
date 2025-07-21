import { useEffect, useState } from "react";
import { useFieldArray, type Control } from "react-hook-form";
import { useInView } from "react-intersection-observer";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useInfiniteGenres } from "@/hooks/queries";
import type { IGenre } from "@/types/schema/genre";

type FormSchema = {
  [key: string]: IGenre[];
};

type Props = {
  control: Control<any>;
  name: string;
  desc?: string;
  label?: string;
};

export const MultiGenresChooser = ({ name, control, desc, label }: Props) => {
  const [open, setOpen] = useState(false);
  const { ref, inView } = useInView();

  const {
    data: allGenres,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteGenres({
    options: {
      enabled: open,
    },
  });

  const { fields, append, remove } = useFieldArray<FormSchema, string, any>({
    control,
    name: name,
    keyName: "customId",
  });

  useEffect(() => {
    if (hasNextPage && inView) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <DialogTrigger asChild>
                <Input
                  readOnly
                  {...field}
                  value={fields.map((f) => f.name).join(", ")}
                  className="cursor-pointer"
                />
              </DialogTrigger>
            </FormControl>
            {desc && <FormDescription>{desc}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />

      <DialogContent className="w-full max-w-[calc(100%-2rem)] px-0 md:max-w-5xl">
        <DialogHeader className="px-6">
          <DialogTitle>Choose Genre(s)</DialogTitle>
          <DialogDescription>Game Genre</DialogDescription>
        </DialogHeader>
        <div className="grid h-full max-h-80 flex-1 grid-cols-1 gap-4 overflow-y-auto px-6 py-4 md:grid-cols-3">
          {allGenres?.pages[0].data.items.length
            ? allGenres?.pages.map((page) =>
                page?.data.items.map((genre) => {
                  const index = fields.findIndex((item) => item.id === genre.id);
                  const isSelected = index !== -1;
                  return (
                    <Button
                      key={genre.id}
                      variant={isSelected ? "default" : "outline"}
                      onClick={() => {
                        if (isSelected) {
                          remove(index);
                        } else {
                          append(genre);
                        }
                      }}
                    >
                      {genre.name}
                    </Button>
                  );
                })
              )
            : "No Genre"}

          <div className="grid-cols-1 md:grid-cols-1">
            {isFetchingNextPage || isLoading || isFetching ? (
              <div className="mt-5 text-center">Loading...</div>
            ) : (
              <div ref={ref} />
            )}
          </div>
        </div>
        <DialogFooter className="px-6">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
