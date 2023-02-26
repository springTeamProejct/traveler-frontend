import { Button, styled } from '@mui/material';
import React from 'react'
import Image from 'next/image';
import KakaoIcon from "/public/kakao.png"
import { KakaoOAuthDatas } from '../../utils';

const KakaoButton = styled(Button)`
    && {
      background-color: #FEE500;
      color: #3C1E1E;
      border: none;
      &:hover {
        background-color: #FFEB00;
      }
    }
  `;

export const KakaoAuthButton = () => {
    return (
        <KakaoButton href={KakaoOAuthDatas().KAKAO_AUTH_URL} variant="contained" startIcon={
            <Image
                src={KakaoIcon}
                alt={"Kakao Icon"}
                width={17}
                height={17} />}>
            카카오 계정으로 로그인
        </KakaoButton>
    );
}