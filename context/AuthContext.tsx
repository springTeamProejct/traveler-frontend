import React, { createContext, useContext, useState } from "react";
import { accessTokenRefresh, loginResponseDto } from "../apis/auth";

type authContext = {
  accessToken: string | null,
  setInitToken: (token: loginResponseDto) => void,
  tokenRefresh: () => void
}

const AuthContext = createContext<authContext>({} as authContext);

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
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

  return <AuthContext.Provider value={{ accessToken, setInitToken, tokenRefresh }}>
    {children}
  </AuthContext.Provider>
}

export function useAuthContext() {
  return useContext(AuthContext);
}