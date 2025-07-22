import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { COUNTRIES } from "@/constants/countries";
import { INPUT_TYPES } from "@/constants/input-types";
import { QUERY_KEYS } from "@/constants/keys";
import { useCreateGame } from "@/hooks/mutations";
import type { FormInputsType } from "@/types/form-inputs-type";
import { genreArraySchema } from "@/types/schema/genre";
import { platformArraySchema } from "@/types/schema/platform";
import { publisherSchema } from "@/types/schema/publisher";
import { MultiGenresChooser } from "../choosers/multi-genres-chooser";
import { MultiPlatformsChooser } from "../choosers/multi-platforms-chooser";
import { PublishersChooser } from "../choosers/publisher-chooser";
import { FormInputs } from "../form";
import { LoadingButton } from "../loading-button";

const schema = z.object({
  title: z.string().min(2),
  release_date: z.date(),
  publisher: publisherSchema,
  description: z.string().nullish(),
  cover_image: z.instanceof(Object).nullish(),
  genres: genreArraySchema.nonempty(),
  platform: platformArraySchema.nonempty(),
});

// {
//     "title": "Grand Theft Auto: Vice City",
//     "release_date": "2002-10-26T20:30:00.000Z",
//     "genre_ids": [
//         {
//             "id": 2,
//             "name": "Action",
//             "description": "The action genre in game emphasizes thrilling sequences, physical feats, and high-stakes scenarios, often involving combat, chases, and explosions."
//         },
//         {
//             "id": 3,
//             "name": "Adventure",
//             "description": "Games focused on story-driven gameplay, exploration, and puzzle-solving, often in a narrative-driven environment."
//         }
//     ],
//     "platform_ids": [
//         {
//             "id": 2,
//             "name": "PS4",
//             "description": "Sony console"
//         },
//         {
//             "id": 1,
//             "name": "PS3",
//             "description": "Sony console"
//         }
//     ],
//     "publisher_id": {
//         "id": 2,
//         "title": "Rockstar",
//         "country": "United States",
//         "founding_date": "1998-04-07T19:30:00Z",
//         "website_url": "https://www.rockstargames.com/",
//         "image": "https://c246462.parspack.net/publishers/test-H815xDccMz-blob"
//     },
//     "cover_image": {
//         "name": "Vice-city-cover.jpg",
//         "lastModified": 1753174028004
//     },
//     "description": "Grand Theft Auto: Vice City is a 2002 action-adventure game developed by Rockstar North and published by Rockstar Games. It is the fourth main game in the Grand Theft Auto series, following 2001's Grand Theft Auto III, and the sixth entry overall.1"
// }

type FormValues = z.infer<typeof schema>;

export function CreateGameDialog() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  console.log(form.watch());

  const createGameMutation = useCreateGame();

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
      gridClassName: " md:col-span-3",
    },
    {
      inputType: INPUT_TYPES.CUSTOM,
      customView: (
        <MultiPlatformsChooser name="platform" control={form.control} label="Platforms" />
      ),
      gridClassName: " md:col-span-3",
    },
    {
      inputType: INPUT_TYPES.CUSTOM,
      customView: <PublishersChooser name="publisher" control={form.control} label="Publisher" />,
      gridClassName: " md:col-span-3",
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
    createGameMutation.mutate(
      {
        ...values,
        release_date: values.release_date.toISOString(),
        "genre_ids[]": values.genres.map((gen) => gen.id),
        "platform_ids[]": values.platform.map((pla) => pla.id),
        publisher_id: values.publisher.id,
      },
      {
        onSuccess: () => {
          setOpen(false);
          form.reset();
          queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.games] });
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">+ Create Game</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New Game</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormInputs control={form.control} inputs={inputs} className="md:grid-cols-1" />

            <div className="flex justify-end pt-2">
              <LoadingButton type="submit" loading={createGameMutation.isPending}>
                Create
              </LoadingButton>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
