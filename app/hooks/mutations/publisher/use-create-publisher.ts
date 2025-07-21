import { useMutation } from "@tanstack/react-query";

import { fetcher } from "@/api/axios";
import { API_URL } from "@/constants/api-url";
import type { ResponseType } from "@/types";
import type {
  CreatePublisherRequest,
  CreatePublisherResponse,
} from "@/types/mutations/create-publisher";

export const useCreatePublisher = () => {
  return useMutation({
    mutationFn: (body: CreatePublisherRequest) => {
      return fetcher.post<ResponseType<CreatePublisherResponse>>(
        API_URL.publisher.publishers,
        body,
        {
          showToast: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
  });
};
