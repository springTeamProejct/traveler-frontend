import axios from "axios";
// import { useMutation } from "@tanstack/react-query";

// export const useAuthMutation = (
//   queryKey: string,
//   key: string,
//   value: string
// ) => {
//   const authInfo = { [key]: value };

//   return useMutation([queryKey], async () => {
//     await axios({
//       method: "post",
//       url: process.env.BACKEND_ADDRESSL + queryKey,
//       headers: { "Content-Type": "application/json" },
//       data: authInfo,
//     });
//   });
// };

// export const useValidateMutation = (
//   queryKey: string,
//   type: string, // phoneNum or email
//   identifier: string, // phone number or email address
//   code: string
// ) => {
//   const vaildateData = { [type]: identifier, code: code };

//   return useMutation([queryKey], async () => {
//     await axios({
//       method: "post",
//       url: process.env.BACKEND_ADDRESS + queryKey,
//       headers: { "Content-Type": "application/json" },
//       data: vaildateData,
//     });
//   });
// };

// export const useRegisterMutation = (
//   queryKey: string,
//   type: string,
//   identifier: string,
//   code: string
// ) => {
//   const vaildateData = { [type]: identifier, code: code };

//   return useMutation([queryKey], async (vaildateData) => {
//     await axios({
//       method: "post",
//       url: process.env.BACKEND_ADDRESS + queryKey,
//       headers: { "Content-Type": "application/json" },
//       data: vaildateData,
//     });
//   });
// };

export const validateAuthCode = (identifier: string, code: string) => {
  const type = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}").test(identifier)
    ? "email"
    : new RegExp("[0-9]{10,11}").test(identifier)
    ? "phoneNum"
    : "형식이 맞지 않습니다.";
  const vaildateData = { [type]: identifier, code: code };

  return axios({
    method: "post",
    url: process.env.BACKEND_ADDRESS + "/users/signup/authcode/validate",
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
    url: process.env.BACKEND_ADDRESS + "/users/signup/authcode",
    headers: { "Content-Type": "application/json" },
    data: authInfo,
  });
};

export const registerAuthCode = (userData: any) => {
  console.log(
    "🚀 ~ file: signup.ts:88 ~ registerAuthCode ~ userData",
    userData
  );
  var userFormData = new FormData();

  for (const key in userData) {
    userFormData.append(key, userData[key]);
  }

  return axios({
    method: "post",
    url: process.env.BACKEND_ADDRESS + "/users",
    data: userFormData,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((res) => res)
    .catch((error) => error);
};
