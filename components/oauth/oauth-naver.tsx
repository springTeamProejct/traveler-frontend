import { Button } from '@mui/material';
import React from 'react'
import Image from 'next/image';
import { NaverOAuthDatas } from '../../utils';

const OAuthNaverButton = () => {

    return (
        <Button href={NaverOAuthDatas().NAVER_AUTH_URL}>
            <Image
                width={300}
                height={45}
                src="https://static.nid.naver.com/oauth/big_g.PNG?version=js-2.0.1"
                alt="kakao login"
            />
        </Button >
    )
}

export default OAuthNaverButton;