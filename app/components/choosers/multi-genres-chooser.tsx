import { useEffect, useState } from "react";
import { useFieldArray, type UseFormReturn } from "react-hook-form";
import { useInView } from "react-intersection-observer";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import type { CustomInputType } from "@/types/form-inputs-type";
import type { IGenre } from "@/types/schema/genre";

type FormSchema = {
  [key: string]: IGenre[];
};

type MultiGenresChooserProps = {
  input: Omit<CustomInputType, "customView">;
  control: UseFormReturn<FormSchema>["control"];
};

export const MultiGenresChooser = ({ input, control }: MultiGenresChooserProps) => {
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

  // 3. Correctly typed useFieldArray
  const { fields, append, remove } = useFieldArray<FormSchema, string, any>({
    control,
    name: input.name,
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
        name={input.name}
        render={({ field }) => (
          <FormItem>
            {input.label && <FormLabel>{input.label}</FormLabel>}
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
            {input.desc && <FormDescription>{input.desc}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />

      <DialogContent className="w-full max-w-[calc(100%-2rem)] overflow-y-auto px-0 md:max-w-5xl">
        <DialogHeader className="px-6">
          <DialogTitle>Choose Genre(s)</DialogTitle>
          <DialogDescription>Game Genre</DialogDescription>
        </DialogHeader>
        <div className="flex max-h-80 w-full flex-1 items-center gap-2 overflow-y-auto px-6 pt-4">
          <div className="grid flex-1 grid-cols-1 gap-5 md:grid-cols-4">
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
                          isSelected ? remove(index) : append(genre);
                        }}
                      >
                        {genre.name}
                      </Button>
                    );
                  })
                )
              : "No Genre"}
          </div>
        </div>

        {isFetchingNextPage || isLoading || isFetching ? "Loading..." : <div ref={ref} />}
      </DialogContent>
    </Dialog>
  );
};
