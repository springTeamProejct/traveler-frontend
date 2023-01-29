import axios from "axios";
import { CONSTANTS } from "../../utils";
import { useMutation } from "@tanstack/react-query";

// email은 비우면 json에서 삭제는 되는데 백엔드에서 정규식처리를 하면 어떨까?
export const useAuthMutation = (
  queryKey: string,
  type: string,
  phoneNum: string,
  email: string
) => {
  return useMutation([queryKey], async () => {
    await axios({
      method: "post",
      url: CONSTANTS.SERVER_URL + queryKey,
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(
        {
          type: type,
          phoneNum: phoneNum,
          email: email,
        },
        (key, value) => {
          if (value === "") return undefined;
          return value;
        }
      ),
    });
  });
};
