import styled from "@emotion/styled";
import { Button } from "@mui/material";
import Image from "next/image";
import GoogleIcon from "/public/google.png";

const GoogleButton = styled(Button)`
  && {
    background-color: #fff;
    color: #757575;
    border: 1px solid #dbdbdb;
    &:hover {
      background-color: #f1f1f1;
    }
  }
`;

export const GoogleAuthButton = () => {
  return (
    <GoogleButton
      variant="contained"
      startIcon={
        <Image src={GoogleIcon} alt={"Google Icon"} width={25} height={25} />
      }>
      구글 계정으로 로그인
    </GoogleButton>
  );
};
