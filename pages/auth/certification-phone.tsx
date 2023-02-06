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
interface AuthCodeSendBtnProps {
  showAuthCodeInput: boolean;
  setShowAuthCodeInput: React.Dispatch<React.SetStateAction<boolean>>;
  setBtnClicked: React.Dispatch<React.SetStateAction<boolean>>;
}
interface AuthCodeInputProps {
  setIsUser: React.Dispatch<React.SetStateAction<string>>;
  sendAuthBtn: boolean;
  authCode: string;
}
interface CertificaationPhoneProps {
  setIsUser: React.Dispatch<React.SetStateAction<string>>;
}
interface PhoneNumberInputPops {
  phoneNumber: string;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
}
// This Page Main Controller
export const CertificaationPhone = ({ setIsUser }: CertificaationPhoneProps) => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [ShowAuthCodeInput, setShowAuthCodeInput] = useState<boolean>(false);
  const [btnClicked, setBtnClicked] = useState<boolean>(false);
  const [authCode, setAuthCode] = useState<string>('123456');
  // 일단 한국만 폰인증.
  let koreanPhoneNumber = (phoneNumber.slice(3)).replaceAll(' ', '');
  const mutate = useAuthMutation('users/signup/authcode', 'phoneNum', koreanPhoneNumber);

  // Send Auth Code
  useEffect(() => {
    // mutate.mutate();
  }, [btnClicked])

  return (
    <Container maxWidth="xs">
      <Stack spacing={2}>
        <PhoneNumberInput phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />
        <AuthCodeSendBtn showAuthCodeInput={ShowAuthCodeInput} setBtnClicked={setBtnClicked} setShowAuthCodeInput={setShowAuthCodeInput} />
        {
          ShowAuthCodeInput &&
          <AuthCodeInput sendAuthBtn={btnClicked} setIsUser={setIsUser} authCode={authCode} />
        }
      </Stack>
    </Container>
  );
};

const PhoneNumberInput = ({ phoneNumber, setPhoneNumber }: PhoneNumberInputPops) => {
  const continents: MuiTelInputContinent[] = ["AS"];
  const excludedCountries: MuiTelInputCountry[] = [];

  const handlePhoneNumberChange = (newPhone: string, info: MuiTelInputInfo) => {
    setPhoneNumber(newPhone);
  };

  return (
    <MuiTelInput
      fullWidth
      defaultCountry="KR"
      value={phoneNumber}
      onChange={handlePhoneNumberChange}
      continents={continents}
      excludedCountries={excludedCountries} />);
};

const AuthCodeInput = ({ sendAuthBtn, setIsUser, authCode }: AuthCodeInputProps) => {
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

const AuthCodeSendBtn = ({ showAuthCodeInput, setBtnClicked, setShowAuthCodeInput }: AuthCodeSendBtnProps) => {
  const { timeLeft: reSendTimeLeft, formattedTimeLeft: formattedReSendTimeLeft, setTimeLeft: setReSendTimeLeft } = useCountdownTimer(0);

  // 수정필요.
  const handleAuthButtonClick = useCallback(() => {
    if (reSendTimeLeft === 0) {
      setBtnClicked((value) => !value);
      setShowAuthCodeInput(true);
      setReSendTimeLeft(30);
      // mutate.mutate();
    }
  }, [formattedReSendTimeLeft, reSendTimeLeft]);

  return (
    <Button
      color="primary"
      fullWidth
      type="submit"
      variant="contained"
      disabled={reSendTimeLeft > 0 ? true : false}
      onClick={handleAuthButtonClick}
    >
      {
        showAuthCodeInput // 0: 인증번호전송, > 1: 재전송
          ? <>재전송 {formattedReSendTimeLeft} </>
          : <>인증번호전송</>
      }
    </Button >
  );
};
