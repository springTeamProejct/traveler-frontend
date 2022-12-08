import { Button } from '@mui/material';
import React, { useEffect } from 'react'
import Image from 'next/image';
import KakaoLoginButton from "../../public/kakao_login_medium_wide.png";

const OAuthKakao = () => {

    return (<>
        <Button>
            <Image
                src={KakaoLoginButton}
                alt="kakao login"
            />
        </Button>
    </>
    )
}

export default OAuthKakao;