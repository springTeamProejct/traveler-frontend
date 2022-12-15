import { Button } from '@mui/material';
import React from 'react'
import Image from 'next/image';
import KakaoLoginButton from "../../public/kakao_login_medium_wide.png";
import { KakaoOAuthDatas } from '../../utils';

const OAuthKakaoButton = () => {

    return (
        <Button href={KakaoOAuthDatas().KAKAO_AUTH_URL}>
            <Image
                src={KakaoLoginButton}
                alt="kakao login"
            />
        </Button>
    )
}

export default OAuthKakaoButton;