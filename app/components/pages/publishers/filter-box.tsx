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
import { publisherSearchParams } from "@/hooks/queries";
import type { FormInputsType } from "@/types/form-inputs-type";

const formSchema = z.object({
  q: z.string().optional(),
  country: z.string().optional(),
});

export const PublisherFilter = () => {
  const [filters, setFilters] = useQueryStates(publisherSearchParams, {
    history: "push",
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: filters,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setFilters(values);
  }

  const inputs: FormInputsType[] = [
    {
      inputType: INPUT_TYPES.TEXT,
      label: "Publisher Name",
      name: "q",
      gridClassName: " md:col-span-3",
      props: {
        placeholder: "Search by title",
      },
    },
    {
      inputType: INPUT_TYPES.TEXT,
      label: "Country",
      name: "country",
      gridClassName: " md:col-span-3",
      props: {
        placeholder: "Search by country",
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
              Apply Filters
            </Button>
          </form>
        </Form>
      </CollapsibleContent>
    </Collapsible>
  );
};
