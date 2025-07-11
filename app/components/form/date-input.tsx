import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";

import { cn } from "@/lib/utils";
import type { DateInputType } from "@/types/form-inputs-type";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type DateInputProps = {
  input: DateInputType;
  control: UseFormReturn<any>["control"];
};
export const DateInput = ({ control, input }: DateInputProps) => {
  return (
    <FormField
      control={control}
      name={input.name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          {input?.label && <FormLabel>{input?.label}</FormLabel>}

          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                // disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                captionLayout="dropdown"
              />
            </PopoverContent>
          </Popover>
          {input?.desc && <FormDescription>{input?.desc}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
