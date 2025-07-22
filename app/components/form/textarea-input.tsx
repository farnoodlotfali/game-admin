import type { Control } from "react-hook-form";

import type { TextAreaInputType } from "@/types/form-inputs-type";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";

type TextInputProps = {
  input: TextAreaInputType;
  control: Control<any>;
};

export const TextAreaInput = ({ input, control }: TextInputProps) => {
  return (
    <FormField
      control={control}
      name={input.name}
      render={({ field: { onChange, value, ...rest } }) => (
        <FormItem>
          {input?.label && <FormLabel>{input?.label}</FormLabel>}

          <FormControl>
            <Textarea
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
