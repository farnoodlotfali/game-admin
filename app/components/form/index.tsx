import type { Control } from "react-hook-form";

import { DateInput } from "./date-input";
import { PhotoInput } from "./photo-input";
import { SelectInput } from "./select-input";
import { TextInput } from "./text-input";
import { INPUT_TYPES } from "@/constants/input-types";
import { cn } from "@/lib/utils";
import type { FormInputsType } from "@/types/form-inputs-type";

type HandleInputTypeProps = {
  input: FormInputsType;
  control: Control<any>;
};

const HandleInputType = ({ control, input }: HandleInputTypeProps) => {
  switch (input.inputType) {
    case INPUT_TYPES.TEXT:
      return <TextInput input={input} control={control} />;
    case INPUT_TYPES.DATE:
      return <DateInput input={input} control={control} />;
    case INPUT_TYPES.SELECT:
      return <SelectInput input={input} control={control} />;
    case INPUT_TYPES.PHOTO:
      return <PhotoInput input={input} control={control} />;
    case INPUT_TYPES.CUSTOM:
      return <>{input.customView}</>;

    default:
      return <></>;
  }
};

type FormInputsProps = {
  inputs: FormInputsType[];
  control: Control<any>;
  className?: string;
};

export const FormInputs = ({ inputs, control, className }: FormInputsProps) => {
  return (
    <div className={cn("grid grid-cols-1 gap-4 md:grid-cols-12", className)}>
      {inputs.map((input, i) => (
        <div key={i} className={cn("col-span-4", input.gridClassName)}>
          <HandleInputType input={input} control={control} />
        </div>
      ))}
    </div>
  );
};
