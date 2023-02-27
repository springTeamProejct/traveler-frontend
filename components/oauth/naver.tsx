import { Button, styled } from '@mui/material';
import React from 'react'
import Image from 'next/image';
import { NaverOAuthDatas } from '../../utils';
import NaverIcon from "/public/naver.ico"

interface Props {
  onClick: () => void;
}

const NaverButton = styled(Button)`
  && {
    background-color: #1EC800;
    color: #fff;
    border: none;
    &:hover {
      background-color: #0E9A00;
    }
  }
`;

export const NaverAuthButton = () => {
  return (
    <NaverButton href={NaverOAuthDatas().NAVER_AUTH_URL} variant="contained" startIcon={
      <Image
        src={NaverIcon}
        alt={"Google Icon"}
        width={20}
        height={20} />}>
      네이버 아이디로 로그인
    </NaverButton>
  );
}