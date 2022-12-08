import { Button } from '@mui/material';
import React, { useEffect } from 'react'
import Image from 'next/image';
import KakaoLoginButton from "../../public/kakao_login_medium_wide.png";

const OAuthKakao = () => {
    const REST_API_KEY = "02ddaa97e21deb004a41e0f09dc46db1";
    const REDIRECT_URI = "http://localhost:3000/";
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    return (<>
        <Button href={KAKAO_AUTH_URL}>
            <Image
                src={KakaoLoginButton}
                alt="kakao login"
            />
        </Button>
    </>
    )
}

export default OAuthKakao;