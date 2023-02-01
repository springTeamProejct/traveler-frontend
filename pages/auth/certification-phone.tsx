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
import React, { useCallback, useEffect, useState } from "react";
import { MuiOtpInput } from 'mui-one-time-password-input';
import { useCountdownTimer } from "../../hooks/useCountdownTimer"
import { useAuthMutation } from "../../apis/auth/signup";
interface AuthButtonProps {
  viewAuthInput: boolean;
  setViewAuthInput: React.Dispatch<React.SetStateAction<boolean>>;
  setBtnClicked: React.Dispatch<React.SetStateAction<boolean>>;
}
interface AuthInputProps {
  setIsUser: React.Dispatch<React.SetStateAction<string>>;
  sendAuthBtn: boolean;
  authCode: string;
}
interface CertificaationPhoneProps {
  setIsUser: React.Dispatch<React.SetStateAction<string>>;
}

export const CertificaationPhone = ({ setIsUser }: CertificaationPhoneProps) => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [viewAuthInput, setViewAuthInput] = useState<boolean>(false);
  const [btnClicked, setBtnClicked] = useState<boolean>(false);
  const [authCode, setAuthCode] = useState<string>('123456');

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
          <AuthInput sendAuthBtn={btnClicked} setIsUser={setIsUser} authCode={authCode} />
        }
      </Stack>
    </Container>
  );
};

const AuthInput = ({ sendAuthBtn, setIsUser, authCode }: AuthInputProps) => {
  const [value, setValue] = useState<string>('');
  const { timeLeft, formattedTimeLeft, setTimeLeft } = useCountdownTimer(0);
  useEffect(() => {
    setTimeLeft(180);
  }, [sendAuthBtn]);

  const handleChange = (newValue: string) => {
    setValue(newValue);
  }
  const handleComplete = (completedValue: string) => {
    if (completedValue === authCode) {
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
        />
        <a href="#" id="auth-count-down"> {formattedTimeLeft}
        </a>
      </FormControl>
    </>
  );
};

const AuthButton = ({ viewAuthInput, setBtnClicked, setViewAuthInput }: AuthButtonProps) => {
  const { timeLeft: reSendTimeLeft, formattedTimeLeft: formattedReSendTimeLeft, setTimeLeft: setReSendTimeLeft } = useCountdownTimer(0);
  const mutate = useAuthMutation('users/signup/authcode', 'PHONE', '01098598222', '');

  const handleAuthButtonClick_ = useCallback(() => {
    if (reSendTimeLeft === 0) {
      setBtnClicked((value) => !value);
      setViewAuthInput(true);
      setReSendTimeLeft(30);
      mutate.mutate();
    }
  }, [formattedReSendTimeLeft, reSendTimeLeft]);

  return (
    <Button
      color="primary"
      fullWidth
      type="submit"
      variant="contained"
      disabled={reSendTimeLeft > 0 ? true : false}
      onClick={handleAuthButtonClick_}
    >
      {
        viewAuthInput // 0: 인증번호전송, > 1: 재전송
          ? <>재전송 {formattedReSendTimeLeft} </>
          : <>인증번호전송</>
      }
    </Button >
  );
};
