import type { DayPicker } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { INPUT_TYPES } from "@/constants/input-types";

type GlobalInputType = {
  name: string;
  desc?: string;
  label?: string;
  gridClassName?: string;
  // control: UseFormReturn<any>["control"];
};

export type TextInputType = {
  props?: React.ComponentProps<"input">;
  name: string;
  desc?: string;
  label?: string;
} & GlobalInputType;

export type DateInputType = {
  props?: React.ComponentProps<typeof DayPicker> & {
    buttonVariant?: React.ComponentProps<typeof Button>["variant"];
  };
} & GlobalInputType;

export type CustomInputType = {
  customView: any;
} & GlobalInputType;

export type FormInputsType =
  | (TextInputType & {
      inputType: INPUT_TYPES.TEXT;
    })
  | (DateInputType & {
      inputType: INPUT_TYPES.DATE;
    })
  | (CustomInputType & {
      inputType: INPUT_TYPES.CUSTOM;
    })
  | (CustomInputType & {
      inputType: INPUT_TYPES.SELECT;
    });
