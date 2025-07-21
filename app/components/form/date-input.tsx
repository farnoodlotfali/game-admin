import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import type { Control } from "react-hook-form";

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
  control: Control<any>;
};
export const DateInput = ({ control, input }: DateInputProps) => {
  return (
    <FormField
      control={control}
      name={input.name}
      render={({ field, fieldState: { error } }) => (
        <FormItem className="flex flex-col">
          {input?.label && <FormLabel>{input?.label}</FormLabel>}

          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground",
                    !!error && "!border-destructive !border"
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
