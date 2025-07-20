import { z } from "zod";

export interface IPublisher {
  id: number;
  title: string;
  country: string;
  founding_date: string;
  website_url: string;
  image_url?: string;
}
export const publisherSchema = z.object({
  id: z.number(),
  title: z.string(),
  country: z.string(),
  founding_date: z.string(),
  website_url: z.string(),
});

export const publisherArraySchema = z.array(publisherSchema);
