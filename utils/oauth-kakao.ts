const KakaoOAuthDatas = () => {
    const REST_API_KEY: string = "02ddaa97e21deb004a41e0f09dc46db1";
    const REDIRECT_URI: string = "http://localhost:3000/"; // Login
    const KAKAO_AUTH_URL: string = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    const LOGOUT_REDIRECT_URI = "http://localhost:3000/"; // Logout

    return { REST_API_KEY, REDIRECT_URI, KAKAO_AUTH_URL }
}

export { KakaoOAuthDatas }