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
import { useCreatePlatform } from "@/hooks/mutations";
import type { FormInputsType } from "@/types/form-inputs-type";
import { FormInputs } from "../form";
import { LoadingButton } from "../loading-button";

const schema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
});

type FormValues = z.infer<typeof schema>;

export function CreatePlatformDialog() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const createPlatformMutation = useCreatePlatform();

  const inputs: FormInputsType[] = [
    {
      inputType: INPUT_TYPES.TEXT,
      label: "Name",
      name: "name",
      props: {
        placeholder: "Platform Name",
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
    createPlatformMutation.mutate(values, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.platforms] });
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">+ Create Platform</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New Platform</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormInputs control={form.control} inputs={inputs} className="md:grid-cols-1" />

            <div className="flex justify-end pt-2">
              <LoadingButton type="submit" loading={createPlatformMutation.isPending}>
                Create
              </LoadingButton>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
