import { format } from "date-fns";

export const dateFilterHelper = (date: string | null | undefined) => {
  if (!date) {
    return null;
  }

  return format(new Date(date), "yyyy-MM-dd");
};
