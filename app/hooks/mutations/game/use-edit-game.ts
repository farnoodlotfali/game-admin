import { useMutation } from "@tanstack/react-query";

import { fetcher } from "@/api/axios";
import { API_URL } from "@/constants/api-url";
import type { ResponseType } from "@/types";
import type { EditGameRequest, EditGameResponse } from "@/types/mutations/edit-game";

export const useEditGame = () => {
  return useMutation({
    mutationFn: (body: EditGameRequest) => {
      return fetcher.put<ResponseType<EditGameResponse>>(
        `${API_URL.game.games}/${body.id}`,
        body.data,
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
