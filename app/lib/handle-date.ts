import { format } from "date-fns";

export const handleDate = (date: string | null | undefined, fmt: string = "yyyy-MM-dd") => {
  if (!date) {
    return null;
  }

  return format(new Date(date), fmt);
};
