import { useEffect } from "react";
import { tokenAtom } from "../../store/user";
import { useRecoilState, useSetRecoilState } from "recoil";

export const setTokenInLocalStorage = (
  refreshToken: string = "",
  accessToken: string = ""
) => {
  useEffect(() => {
    if (refreshToken) {
      window.localStorage.setItem("RefreshToken", refreshToken);
    }
    if (accessToken) {
      window.localStorage.setItem("AccessToken", accessToken);
    }
  }, []);
};

// 로그인을 할 때, Access Token이 만료되고, Refresh Token도 만료되었을 때
// setTokenInLocalStorage도 추가해주어야함.
export const setRefeshTokenAtom = () => {
  const setRefreshTokenAtom = useSetRecoilState(tokenAtom);

  useEffect(() => {
    const refreshToken = window.localStorage.getItem("RefreshToken");
    setRefreshTokenAtom((prevResponseTokenData) => {
      return {
        ...prevResponseTokenData,
        refreshToken: refreshToken !== null ? refreshToken : "",
      };
    });
  }, []);
};

export const setAccessTokenAtom = () => {
  const [accessTokenAtom, setAccessTokenAtom] = useRecoilState(tokenAtom);

  useEffect(() => {
    const accessToken = window?.localStorage.getItem("AccessToken");
    // AccessTokenAtom, webStorage.getItem("AccessToken")이 없거나, 만료가 되었거나,
    // 발급토큰 넣기
    // setTokenInLocalStorage도 추가해주어야함.
    if (!accessTokenAtom || !accessToken) {
      // 재발급 ( AccessToken)
      // RefreshToken이 만료가 되어서 발급이 안되었으면 RefreshToken을 받는 코드 작성 예시는 아래와 같음.
      //   if()
      //   setRefeshTokenAtom();
    }

    setAccessTokenAtom((prevResponseTokenData) => {
      return {
        ...prevResponseTokenData,
        accessToken: accessToken !== null ? accessToken : "",
      };
    });
  }, []);
};
