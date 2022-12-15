import { Button } from '@mui/material';
import React from 'react'
import Image from 'next/image';
import naver_login_medium_wide from "../../public/naver_login_medium_wide.png";

const OAuthNaverButton = () => {

    return (
        <Button href="https://nid.naver.com/oauth2.0/authorize">
            <Image
                width={300}
                height={45}
                src={naver_login_medium_wide}
                alt="kakao login"
            />
        </Button >
    )
}

export default OAuthNaverButton;