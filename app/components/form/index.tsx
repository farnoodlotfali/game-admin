import type { UseFormReturn } from "react-hook-form";

import { DateInput } from "./date-input";
import { TextInput } from "./text-input";
import { INPUT_TYPES } from "@/constants/input-types";
import { cn } from "@/lib/utils";
import type { FormInputsType } from "@/types/form-inputs-type";

type HandleInputTypeProps = {
  input: FormInputsType;
  control: UseFormReturn<any>["control"];
};

const HandleInputType = ({ control, input }: HandleInputTypeProps) => {
  switch (input.inputType) {
    case INPUT_TYPES.TEXT:
      return <TextInput input={input} control={control} />;
    case INPUT_TYPES.DATE:
      return <DateInput input={input} control={control} />;
    case INPUT_TYPES.CUSTOM:
      return <input.customView input={input} control={control} />;

    default:
      return <></>;
  }
};

type FormInputsProps = {
  inputs: FormInputsType[];
  control: UseFormReturn<any>["control"];
};

export const FormInputs = ({ inputs, control }: FormInputsProps) => {
  return (
    <div className={cn("grid grid-cols-1 gap-4 md:grid-cols-12")}>
      {inputs.map((input) => (
        <div key={input.name} className={cn("col-span-4 ...", input.gridClassName)}>
          <HandleInputType input={input} control={control} />
        </div>
      ))}
    </div>
  );
};
