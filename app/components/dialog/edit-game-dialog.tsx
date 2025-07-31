import { Suspense, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { INPUT_TYPES } from "@/constants/input-types";
import { QUERY_KEYS } from "@/constants/keys";
import { useEditGame } from "@/hooks/mutations";
import { useSuspenseGame } from "@/hooks/queries";
import type { FormInputsType } from "@/types/form-inputs-type";
import { genreArraySchema } from "@/types/schema/genre";
import { platformArraySchema } from "@/types/schema/platform";
import { publisherSchema } from "@/types/schema/publisher";
import { MultiGenresChooser } from "../choosers/multi-genres-chooser";
import { MultiPlatformsChooser } from "../choosers/multi-platforms-chooser";
import { PublishersChooser } from "../choosers/publisher-chooser";
import { FormInputs } from "../form";
import { LoadingButton } from "../loading-button";
import { Skeleton } from "../ui/skeleton";

const schema = z.object({
  title: z.string().min(2),
  release_date: z.date(),
  publisher: publisherSchema,
  description: z.string().nullish(),
  cover_image: z.union([z.string(), z.record(z.any())]).nullish(),
  genres: genreArraySchema.nonempty(),
  platforms: platformArraySchema.nonempty(),
});

type FormValues = z.infer<typeof schema>;
type Props = {
  id: number;
  open: boolean;
  onClose: () => void;
};
export function EditGameDialog(props: Props) {
  return (
    <Dialog open={props.open} onOpenChange={props.onClose}>
      <DialogContent className="sm:max-w-lg">
        <Suspense fallback={<Skeleton className="h-96 w-full" />}>
          <EditForm {...props} />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
}

const EditForm = ({ id, onClose, open }: Props) => {
  const queryClient = useQueryClient();

  const {
    data: { data: gameData },
    isSuccess,
  } = useSuspenseGame({
    id: id,
    options: {
      enabled: open && !!id,
    },
  });
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (isSuccess) {
      form.reset(gameData as unknown as FormValues);
      form.setValue("release_date", new Date(gameData.release_date));
    }
  }, [isSuccess, gameData]);

  const editGameMutation = useEditGame();

  const inputs: FormInputsType[] = [
    {
      inputType: INPUT_TYPES.TEXT,
      label: "Title",
      name: "title",
      props: {
        placeholder: "Game Title",
      },
    },
    {
      inputType: INPUT_TYPES.DATE,
      label: "Release Date",
      name: "release_date",
    },
    {
      inputType: INPUT_TYPES.CUSTOM,
      customView: <MultiGenresChooser name="genres" control={form.control} label="Genres" />,
    },
    {
      inputType: INPUT_TYPES.CUSTOM,
      customView: (
        <MultiPlatformsChooser name="platforms" control={form.control} label="Platforms" />
      ),
    },
    {
      inputType: INPUT_TYPES.CUSTOM,
      customView: <PublishersChooser name="publisher" control={form.control} label="Publisher" />,
    },

    {
      inputType: INPUT_TYPES.PHOTO,
      label: "Cover Image",
      name: "cover_image",
    },

    {
      inputType: INPUT_TYPES.TEXTAREA,
      label: "Description",
      name: "description",
      props: {
        placeholder: "...",
      },
    },
  ];

  const onSubmit = (values: FormValues) => {
    const updateData = values;

    editGameMutation.mutate(
      {
        id: id,
        data: {
          title: values.title,
          "genre_ids[]": values.genres.map((gen) => gen.id),
          "platform_ids[]": values.platforms.map((pla) => pla.id),
          publisher_id: values.publisher.id,
          release_date: updateData.release_date.toISOString(),
          cover_image: typeof values.cover_image === "string" ? undefined : values.cover_image,
          description: values.description,
        },
      },
      {
        onSuccess: () => {
          onClose();
          form.reset();
          setTimeout(() => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.games] });
          }, 500);
        },
      }
    );
  };
  return (
    <>
      <DialogHeader>
        <DialogTitle>Edit Game</DialogTitle>
        <DialogDescription>{gameData.title}</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormInputs control={form.control} inputs={inputs} className="md:grid-cols-1" />

          <div className="flex justify-end pt-2">
            <LoadingButton type="submit" loading={editGameMutation.isPending}>
              Update
            </LoadingButton>
          </div>
        </form>
      </Form>
    </>
  );
};
