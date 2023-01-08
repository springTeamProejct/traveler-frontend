import {
  Button,
  Container,
  FormControl,
} from "@mui/material";
import { Stack } from "@mui/system";
import {
  MuiTelInput,
  MuiTelInputContinent,
  MuiTelInputCountry,
  MuiTelInputInfo,
} from "mui-tel-input";
import React, { useEffect, useState } from "react";
import { MuiOtpInput } from 'mui-one-time-password-input';
import { useCountdownTimer } from "../../hooks/useCountdownTimer"
import { MutationSendAuthCode, useAuthStatus } from "../../apis/auth/signup";
import { useMutation } from "@tanstack/react-query";
interface AuthButtonProps {
  viewAuthInput: boolean;
  setViewAuthInput: React.Dispatch<React.SetStateAction<boolean>>;
  setBtnClicked: React.Dispatch<React.SetStateAction<boolean>>;
}
interface AuthInputProps {
  setIsUser: React.Dispatch<React.SetStateAction<string>>;
  sendAuthBtn: boolean;
}
interface CertificaationPhoneProps {
  setIsUser: React.Dispatch<React.SetStateAction<string>>;
}

export const CertificaationPhone = ({ setIsUser }: CertificaationPhoneProps) => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [viewAuthInput, setViewAuthInput] = useState<boolean>(false);
  const [btnClicked, setBtnClicked] = useState<boolean>(false);

  const handlePhoneNumberChange = (newPhone: string, info: MuiTelInputInfo) => {
    setPhoneNumber(newPhone);
  };
  const continents: MuiTelInputContinent[] = ["AS"];
  const excludedCountries: MuiTelInputCountry[] = [];

  return (
    <Container maxWidth="xs">
      <Stack spacing={2}>
        <MuiTelInput
          fullWidth
          defaultCountry="KR"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          continents={continents}
          excludedCountries={excludedCountries}
        />
        <AuthButton viewAuthInput={viewAuthInput} setBtnClicked={setBtnClicked} setViewAuthInput={setViewAuthInput} />
        {
          viewAuthInput &&
          <AuthInput sendAuthBtn={btnClicked} setIsUser={setIsUser} />
        }
      </Stack>
    </Container>
  );
};

const AuthInput = ({ sendAuthBtn, setIsUser }: AuthInputProps) => {
  const [value, setValue] = useState<string>('');
  const { timeLeft, formattedTimeLeft, setTimeLeft } = useCountdownTimer(0);
  useEffect(() => {
    setTimeLeft(180);
  }, [sendAuthBtn]);

  const handleChange = (newValue: string) => {
    setValue(newValue);
  }
  const handleComplete = (finalValue: string) => {
    if (finalValue === '222222') {
      console.log('hello')

      // 회원인지 아닌지 확인
      if (false) {
        setIsUser('isUser');
      }
      else {
        setIsUser('notUser')
      }
    }
  }

  return (
    <>
      <FormControl variant="standard">
        <MuiOtpInput
          TextFieldsProps={{
            // color: 'success'
          }}
          id="auth-input"
          value={value}
          onChange={handleChange}
          onComplete={handleComplete}
          length={6}
          validateChar={(character: string, index: number) => true}
        />
        <a href="#" id="auth-count-down"> {formattedTimeLeft}
        </a>
      </FormControl>
    </>
  );
};

const AuthButton = ({ viewAuthInput, setBtnClicked, setViewAuthInput }: AuthButtonProps) => {
  const { timeLeft, formattedTimeLeft, setTimeLeft } = useCountdownTimer(0);

  const sendAuthcode = useMutation(MutationSendAuthCode);

  if (sendAuthcode.isLoading) return <p>Loading...</p>
  if (sendAuthcode.error) return <p>An error has occurred</p>

  const handleAuthButtonClick = () => {
    if (timeLeft === 0) {
      setBtnClicked((value) => !value);
      setViewAuthInput(true);
      setTimeLeft(30);
      // sendAuthcode.mutate(data);
      // useAuthStatus("phone", "01098598222", "", {});
    }
  }

  return (
    <Button
      color="primary"
      fullWidth
      type="submit"
      variant="contained"
      disabled={timeLeft > 0 ? true : false}
      onClick={handleAuthButtonClick}
    >
      {
        viewAuthInput // 0: 인증번호전송 >1: 재전송
          ? <>재전송 {formattedTimeLeft} </>
          : <>인증번호전송</>
      }
    </Button >
  );
};
