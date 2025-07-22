import type { IPlatform } from "../schema/platform";

export type CreatePlatformRequest = {
  name: string;
  description: string;
};

export type CreatePlatformResponse = {
  platform: IPlatform;
};
