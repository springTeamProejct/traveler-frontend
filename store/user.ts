import { atom, atomFamily, selector } from "recoil";
import { accessTokenRefresh, reponseTokenData, profile } from "../apis/auth";

export interface tokenAtomProps {
  accessToken: string;
  RefrechToken: string | null;
}

export const userAtom = atom({
  key: "userAtom",
  default: null,
});

export const tokenAtom = atom<reponseTokenData>({
  key: "authState",
  default: {
    grantType: "Bearer",
    accessToken: "",
    refreshToken: "",
    accessTokenExpiresIn: 0,
  },
});

export const myPorfileAtom = atom<profile>({
  key: "myPorfileAtom",
  default: {
    nickname: "",
    fileId: "",
    email: "",
    phoneNum: "",
  },
});
