import type { IPublisher } from "../schema/publisher";

export type CreatePublisherRequest = {
  title: string;
  founding_date: string;
  country: string;
  website_url?: string | null;
  image?: object | null;
};

export type CreatePublisherResponse = {
  publisher: IPublisher;
};
