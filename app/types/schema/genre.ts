import { z } from "zod";

export interface IGenre {
  id: number;
  name: string;
  description: string;
}

export const genreSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
});

export const genreArraySchema = z.array(genreSchema);
