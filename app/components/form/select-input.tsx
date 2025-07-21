import type { Control } from "react-hook-form";

import type { SelectInputType } from "@/types/form-inputs-type";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type SelectInputProps = {
  input: SelectInputType;
  control: Control<any>;
};

export const SelectInput = ({ input, control }: SelectInputProps) => {
  return (
    <FormField
      control={control}
      name={input.name}
      render={({ field }) => {
        return (
          <FormItem key={field.value}>
            {input?.label && <FormLabel>{input?.label}</FormLabel>}
            <Select
              {...input.props}
              onValueChange={(e) => {
                field.onChange(e);
                if (input.props?.onValueChange) {
                  input.props?.onValueChange(e);
                }
              }}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {input.options.map((item) => {
                  return (
                    <SelectItem value={String(item.value)} key={item.value}>
                      {item.title}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            {input?.desc && <FormDescription>{input?.desc}</FormDescription>}

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
