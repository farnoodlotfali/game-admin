import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown } from "lucide-react";
import { useQueryStates } from "nuqs";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { MultiGenresChooser } from "@/components/choosers/multi-genres-chooser";
import { MultiPlatformsChooser } from "@/components/choosers/multi-platforms-chooser";
import { MultiPublishersChooser } from "@/components/choosers/multi-publishers-chooser";
import { FormInputs } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Form } from "@/components/ui/form";
import { INPUT_TYPES } from "@/constants/input-types";
import { gameSearchParams } from "@/hooks/queries";
import type { FormInputsType } from "@/types/form-inputs-type";
import { genreArraySchema } from "@/types/schema/genre";
import { platformArraySchema } from "@/types/schema/platform";
import { publisherArraySchema } from "@/types/schema/publisher";

const formSchema = z.object({
  q: z.string().nullish(),
  releaseDateFrom: z.date().nullish(),
  releaseDateTo: z.date().nullish(),
  platform_id: platformArraySchema.nullish(),
  genre_id: genreArraySchema.nullish(),
  publisher_id: publisherArraySchema.nullish(),
});

export const GameFilterBox = () => {
  const [filters, setFilters] = useQueryStates(gameSearchParams, {
    history: "replace",
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: filters,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setFilters(values);
  }

  const inputs: FormInputsType[] = [
    {
      inputType: INPUT_TYPES.TEXT,
      label: "Game Title",
      name: "q",
      gridClassName: " md:col-span-3",
      props: {
        placeholder: "Game Title",
      },
    },
    {
      inputType: INPUT_TYPES.DATE,
      label: "Release Date From",
      name: "releaseDateFrom",
      gridClassName: " md:col-span-3",
    },
    {
      inputType: INPUT_TYPES.DATE,
      label: "Release Date To",
      name: "releaseDateTo",
      gridClassName: " md:col-span-3",
    },
    {
      inputType: INPUT_TYPES.CUSTOM,
      customView: <MultiGenresChooser name="genre_id" control={form.control} label="Genres" />,
      gridClassName: " md:col-span-3",
    },
    {
      inputType: INPUT_TYPES.CUSTOM,
      customView: (
        <MultiPlatformsChooser name="platform_id" control={form.control} label="Platforms" />
      ),
      gridClassName: " md:col-span-3",
    },
    {
      inputType: INPUT_TYPES.CUSTOM,
      customView: (
        <MultiPublishersChooser name="publisher_id" control={form.control} label="Publishers" />
      ),
      gridClassName: " md:col-span-3",
    },
  ];

  return (
    <Collapsible className="group/collapsible mb-3">
      <CollapsibleTrigger asChild>
        <Button variant="secondary" className="w-full">
          Filters
          <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="bg-secondary my-2 rounded-lg p-4">
            <FormInputs control={form.control} inputs={inputs} />

            <Button className="mt-3" type="submit">
              Submit
            </Button>
            <Button
              className="mt-3 ml-3"
              variant="outline"
              type="button"
              onClick={() => {
                form.reset();
                setFilters(null);
              }}
            >
              Reset
            </Button>
          </form>
        </Form>
      </CollapsibleContent>
    </Collapsible>
  );
};
