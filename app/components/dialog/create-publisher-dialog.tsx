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
import { useCreatePublisher } from "@/hooks/mutations";
import type { FormInputsType } from "@/types/form-inputs-type";
import { FormInputs } from "../form";
import { LoadingButton } from "../loading-button";

const schema = z.object({
  title: z.string().min(2),
  country: z.string().min(2),
  founding_date: z.date(),
  website_url: z.string().url().nullish(),
  image: z.instanceof(Object).nullish(),
});

type FormValues = z.infer<typeof schema>;

export function CreatePublisherDialog() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const createPublisherMutation = useCreatePublisher();

  const inputs: FormInputsType[] = [
    {
      inputType: INPUT_TYPES.TEXT,
      label: "Title",
      name: "title",
      props: {
        placeholder: "Publisher Title",
      },
    },
    {
      inputType: INPUT_TYPES.SELECT,
      label: "Country",
      name: "country",
      options: COUNTRIES,
    },
    {
      inputType: INPUT_TYPES.DATE,
      label: "Founding Date",
      name: "founding_date",
    },
    {
      inputType: INPUT_TYPES.TEXT,
      label: "Website URL",
      name: "website_url",
      props: {
        type: "url",
        placeholder: "https://example.com",
      },
    },
    {
      inputType: INPUT_TYPES.PHOTO,
      label: "Image",
      name: "image",
    },
  ];

  const onSubmit = (values: FormValues) => {
    createPublisherMutation.mutate(
      {
        ...values,
        founding_date: values.founding_date.toISOString(),
      },
      {
        onSuccess: () => {
          setOpen(false);
          form.reset();
          queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.publishers] });
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">+ Create Publisher</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New Publisher</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormInputs control={form.control} inputs={inputs} className="md:grid-cols-1" />

            <div className="flex justify-end pt-2">
              <LoadingButton type="submit" loading={createPublisherMutation.isPending}>
                Create
              </LoadingButton>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
