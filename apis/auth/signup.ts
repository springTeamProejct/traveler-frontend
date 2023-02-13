import axios from "axios";
import { CONSTANTS } from "../../utils";
import { useMutation } from "@tanstack/react-query";

export const useAuthMutation = (
  queryKey: string,
  key: string,
  value: string
) => {
  const authInfo = { [key]: value };

  return useMutation([queryKey], async () => {
    await axios({
      method: "post",
      url: CONSTANTS.SERVER_URL + queryKey,
      headers: { "Content-Type": "application/json" },
      data: authInfo,
    });
  });
};

export const useValidateMutation = (
  queryKey: string,
  type: string, // phoneNum or email
  identifier: string, // phone number or email address
  code: string
) => {
  const vaildateData = { [type]: identifier, code: code };

  return useMutation([queryKey], async () => {
    await axios({
      method: "post",
      url: CONSTANTS.SERVER_URL + queryKey,
      headers: { "Content-Type": "application/json" },
      data: vaildateData,
    });
  });
};

export const useRegisterMutation = (
  queryKey: string,
  type: string,
  identifier: string,
  code: string
) => {
  const vaildateData = { [type]: identifier, code: code };

  return useMutation([queryKey], async (vaildateData) => {
    await axios({
      method: "post",
      url: CONSTANTS.SERVER_URL + queryKey,
      headers: { "Content-Type": "application/json" },
      data: vaildateData,
    });
  });
};

export const validateAuthCode = (
  type: string,
  identifier: string,
  code: string
) => {
  const vaildateData = { [type]: identifier, code: code };

  return axios({
    method: "post",
    url: CONSTANTS.SERVER_URL + "users/signup/authcode/validate",
    headers: { "Content-Type": "application/json" },
    data: vaildateData,
  })
    .then((res) => res)
    .catch((error) => error);
};

export const sendAuthCode = (key: string, value: string) => {
  const authInfo = { [key]: value };

  return axios({
    method: "post",
    url: CONSTANTS.SERVER_URL + "users/signup/authcode",
    headers: { "Content-Type": "application/json" },
    data: authInfo,
  });
};
