import { z } from "zod";

export interface IPlatform {
  id: number;
  name: string;
  description: string;
}
export const platformSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
});

export const platformArraySchema = z.array(platformSchema);
