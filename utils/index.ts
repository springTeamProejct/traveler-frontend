import { CONSTANTS, KakaoOAuthDatas, NaverOAuthDatas } from "./constants";
import { useEffect, useRef } from "react";

const useDidUpdateEffect = (fn: () => void, inputs: any[]) => {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) {
      return fn();
    }
    didMountRef.current = true;
  }, inputs);
};
export { KakaoOAuthDatas, CONSTANTS, NaverOAuthDatas, useDidUpdateEffect };
