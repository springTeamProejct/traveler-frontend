const CONSTANTS = {
  SERVER_URL: "http://localhost:8000/",
  HTTP_METHOD: {
    GET: "get",
    POST: "post",
    PATCH: "PATCH",
    DELETE: "delete",
  },
  AUTHORIZATION_CODE: "authorization_code",
};

const KakaoOAuthDatas = () => {
  const REDIRECT_URI: string = "http://localhost:3000/"; // Logi
  const KAKAO_AUTH_URL: string = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.OAUTH.KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const LOGOUT_REDIRECT_URI = "http://localhost:3000/"; // Logout

  return { REDIRECT_URI, KAKAO_AUTH_URL };
};

const NaverOAuthDatas = () => {
  const REDIRECT_URI: string = "http://localhost:3000/"; // Login
  const NAVER_AUTH_URL: string = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.OAUTH.NAVER_CLIENT_ID}&state=JVM0pmrBoK&redirect_uri=${REDIRECT_URI}`;
  const LOGOUT_REDIRECT_URI = "http://localhost:3000/"; // Logout

  return { REDIRECT_URI, NAVER_AUTH_URL };
};

export { CONSTANTS, NaverOAuthDatas, KakaoOAuthDatas };
