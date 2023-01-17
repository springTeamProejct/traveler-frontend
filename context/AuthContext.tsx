import React, { createContext, useContext, useState } from "react";
import { accessTokenRefresh, loginResponseDto, profile } from "../apis/auth";

type authContext = {
  profile: profile | null,
  setProfile: React.Dispatch<React.SetStateAction<profile | null>>,
  accessToken: string | null,
  setInitToken: (token: loginResponseDto) => void,
  tokenRefresh: () => void
}

const AuthContext = createContext<authContext>({} as authContext);

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  //api를 통해서 user의 정보를 불어오는 부분 미작성 -> 백엔드 api 완성되면 추가!
  const [profile, setProfile] = useState<profile | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  const tokenRefresh = async () => {
    if (accessToken && refreshToken) {
      accessTokenRefresh(accessToken, refreshToken)
        .then(token => {
          setAccessToken(token.accessToken);
          setRefreshToken(token.refreshToken);
        })
    }
  }

  const setInitToken = (token: loginResponseDto) => {
    setAccessToken(token.accessToken);
    setRefreshToken(token.refreshToken);
  }

  return <AuthContext.Provider value={{ profile, setProfile, accessToken, setInitToken, tokenRefresh }}>
    {children}
  </AuthContext.Provider>
}

export function useAuthContext() {
  return useContext(AuthContext);
}