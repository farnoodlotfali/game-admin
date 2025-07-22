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
import { INPUT_TYPES } from "@/constants/input-types";
import { QUERY_KEYS } from "@/constants/keys";
import { useCreateGenre } from "@/hooks/mutations";
import type { FormInputsType } from "@/types/form-inputs-type";
import { FormInputs } from "../form";
import { LoadingButton } from "../loading-button";

const schema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
});

type FormValues = z.infer<typeof schema>;

export function CreateGenreDialog() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const createGenreMutation = useCreateGenre();

  const inputs: FormInputsType[] = [
    {
      inputType: INPUT_TYPES.TEXT,
      label: "Name",
      name: "name",
      props: {
        placeholder: "Genre Name",
      },
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
    createGenreMutation.mutate(values, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.genres] });
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">+ Create Genre</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New Genre</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormInputs control={form.control} inputs={inputs} className="md:grid-cols-1" />

            <div className="flex justify-end pt-2">
              <LoadingButton type="submit" loading={createGenreMutation.isPending}>
                Create
              </LoadingButton>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
