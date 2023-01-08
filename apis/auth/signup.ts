import axios, { AxiosError } from "axios";
import { CONSTANTS } from "../../utils";
import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from "@tanstack/react-query";

type AuthResultResponse = {
  status: string;
  data: JSON;
};

export const MutationSendAuthCode = (body: Object) =>
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
