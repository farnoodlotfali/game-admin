import { useMutation } from "@tanstack/react-query";

import { fetcher } from "@/api/axios";
import { API_URL } from "@/constants/api-url";
import type { ResponseType } from "@/types";
import type { CreateGameRequest, CreateGameResponse } from "@/types/mutations/create-game";

export const useCreateGame = () => {
  return useMutation({
    mutationFn: (body: CreateGameRequest) => {
      return fetcher.post<ResponseType<CreateGameResponse>>(API_URL.game.games, body, {
        showToast: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
  });
};
