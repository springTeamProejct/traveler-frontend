import { useMutation } from "@tanstack/react-query";
import { KakaoOAuthDatas } from "../../utils";
import { CONSTANTS } from "../../utils";

export const Kakao = () => {
  const KakaoOAuthDatas_ = KakaoOAuthDatas();

  const getKakaoTocken = useMutation({
    mutationFn: (authorizationCode: string) => {
      const json_parameters = {
        grant_type: CONSTANTS.AUTHORIZATION_CODE, // 고정
        client_id: process.env.oauth.KAKAO_CLIENT_ID,
        redirect_uri: KakaoOAuthDatas_.REDIRECT_URI,
        code: authorizationCode,
      };
      return fetch(`https://kauth.kakao.com/oauth/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        body: new URLSearchParams(json_parameters),
      }).then((res) => res.json());
    },
  });

  if (getKakaoTocken.isLoading) return "Loading...";

  if (getKakaoTocken.error) return "An error has occurred";

  if (getKakaoTocken.isSuccess) {
    console.log(getKakaoTocken.data);
    return "Success";
  }

  return;
};
