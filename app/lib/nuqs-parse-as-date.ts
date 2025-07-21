import { format } from "date-fns";
import { createParser } from "nuqs";

export const parseAsDate = createParser({
  parse(queryValue) {
    return new Date(queryValue);
  },
  serialize(value) {
    return format(new Date(value), "yyyy-MM-dd");
  },
});
