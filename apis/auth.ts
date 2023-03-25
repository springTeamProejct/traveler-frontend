import axios from "axios";

export type reponseTokenData = {
  grantType: "Bearer";
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: number;
};

export async function getToken(loginDto: {
  email: string;
  password: string;
}): Promise<reponseTokenData> {
  return axios({
    method: "post",
    url: `${process.env.BACKEND_ADDRESS}/users/login`,
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify(loginDto),
  })
    .then((res) => res.data)
    .catch((error) => error);
}

export type profile = {
  nickname: string;
  fileId: string;
  email: string;
  phoneNum: string;
};

export async function fetchProfile(accessToken: string): Promise<profile> {
  return axios({
    method: "get",
    url: `${process.env.BACKEND_ADDRESS}/users/mypage`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => res.data)
    .catch((error) => error);
}

export async function accessTokenRefresh(
  accessToken: string,
  refreshToken: string
): Promise<reponseTokenData> {
  return axios({
    method: "post",
    url: `${process.env.BACKEND_ADDRESS}/users/reissue`,
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify({ accessToken, refreshToken }),
  })
    .then((res) => res.data)
    .catch((error) => error);
}

export async function logout() {
  //통신

  //context 삭제

  // localstorage 삭제
  localStorage.clear();
}
