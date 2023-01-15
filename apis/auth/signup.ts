import axios, { AxiosError } from "axios";
import { CONSTANTS } from "../../utils";
import {
  UseQueryOptions,
  UseQueryResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
// 폰 인증은 재사용이 많을수도 있어서 Custom hooks 생성

type AuthResultResponse = {
  status: string;
  data: JSON;
};

const MutationSendAuthCode = (body: Object) =>
  axios({
    method: "post",
    url: `${CONSTANTS.SERVER_URL}/users/signup/authcode`,
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify(body, (key, value) => {
      if (value === "") return undefined;
      return value;
    }),
  }).then((res) => res.data);

export const useAuthStatus = (
  type: string,
  phoneNum: string = "",
  email: string = "",
  options?: UseQueryOptions<
    AuthResultResponse,
    AxiosError,
    AuthResultResponse,
    ["authStatus"]
  >
): UseQueryResult<AuthResultResponse, AxiosError> => {
  return useQuery(
    ["authStatus"],
    () =>
      MutationSendAuthCode({ type: type, phoneNum: phoneNum, email: email }),
    options
  );
};
