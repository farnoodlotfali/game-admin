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
      render={({ field: { onChange, value, ...rest } }) => (
        <FormItem>
          {input?.label && <FormLabel>{input?.label}</FormLabel>}

          <FormControl>
            <Input
              {...input.props}
              {...rest}
              onChange={(e) => {
                onChange(e);
                if (input.props?.onChange) {
                  input.props?.onChange(e);
                }
              }}
              value={value ?? ""}
            />
          </FormControl>
          {input?.desc && <FormDescription>{input?.desc}</FormDescription>}

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
