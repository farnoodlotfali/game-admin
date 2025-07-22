import { useMutation } from "@tanstack/react-query";

import { fetcher } from "@/api/axios";
import { API_URL } from "@/constants/api-url";
import type { ResponseType } from "@/types";
import type {
  CreatePlatformRequest,
  CreatePlatformResponse,
} from "@/types/mutations/create-platform";

export const useCreatePlatform = () => {
  return useMutation({
    mutationFn: (body: CreatePlatformRequest) => {
      return fetcher.post<ResponseType<CreatePlatformResponse>>(API_URL.platform.platforms, body, {
        showToast: true,
      });
    },
  });
};
