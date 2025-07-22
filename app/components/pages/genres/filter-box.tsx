import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown } from "lucide-react";
import { useQueryStates } from "nuqs";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { FormInputs } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Form } from "@/components/ui/form";
import { INPUT_TYPES } from "@/constants/input-types";
import { genresSearchParams } from "@/hooks/queries";
import type { FormInputsType } from "@/types/form-inputs-type";

const formSchema = z.object({
  q: z.string().optional(),
});

export const GenresFilter = () => {
  const [filters, setFilters] = useQueryStates(genresSearchParams, {
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
      label: "Genre Name",
      name: "q",
      gridClassName: " md:col-span-3",
      props: {
        placeholder: "Search by title",
      },
    },
  ];
  return (
    <Collapsible className="group/collapsible mb-4">
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
              Apply
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
