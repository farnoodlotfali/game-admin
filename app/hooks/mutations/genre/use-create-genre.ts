import { useMutation } from "@tanstack/react-query";

import { fetcher } from "@/api/axios";
import { API_URL } from "@/constants/api-url";
import type { ResponseType } from "@/types";
import type { CreateGenreRequest, CreateGenreResponse } from "@/types/mutations/create-genre";

export const useCreateGenre = () => {
  return useMutation({
    mutationFn: (body: CreateGenreRequest) => {
      return fetcher.post<ResponseType<CreateGenreResponse>>(API_URL.genre.genres, body, {
        showToast: true,
      });
    },
  });
};
