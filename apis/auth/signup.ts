import axios from "axios";
import { CONSTANTS } from "../../utils";
import { useMutation } from "@tanstack/react-query";

export const useAuthMutation = (
  queryKey: string,
  key: string,
  value: string
) => {
  const authInfo = JSON.parse(`{"${key}": "${value}"}`);

  return useMutation([queryKey], async () => {
    await axios({
      method: "post",
      url: CONSTANTS.SERVER_URL + queryKey,
      headers: { "Content-Type": "application/json" },
      data: authInfo,
    });
  });
};
