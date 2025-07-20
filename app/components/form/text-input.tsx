import type { Control } from "react-hook-form";

import type { TextInputType } from "@/types/form-inputs-type";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

type TextInputProps = {
  input: TextInputType;
  control: Control<any>;
};

export const TextInput = ({ input, control }: TextInputProps) => {
  return (
    <FormField
      control={control}
      name={input.name}
      render={({ field }) => (
        <FormItem>
          {input?.label && <FormLabel>{input?.label}</FormLabel>}

          <FormControl>
            <Input {...input.props} {...field} />
          </FormControl>
          {input?.desc && <FormDescription>{input?.desc}</FormDescription>}

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
