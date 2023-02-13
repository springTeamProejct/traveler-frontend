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
import { validateAuthCode, sendAuthCode } from "../../apis/auth/signup";
import { ErrorDefinition } from "../../utils/error";

interface AuthCodeSendBtnProps {
  showAuthCodeInput: boolean;
  phoneNumber: string;
  setShowAuthCodeInput: React.Dispatch<React.SetStateAction<boolean>>;
  setBtnClicked: React.Dispatch<React.SetStateAction<boolean>>;
}
interface AuthCodeInputProps {
  sendAuthBtn: boolean;
  phoneNumber: string;
  setIsUser: React.Dispatch<React.SetStateAction<string>>;
  setPhoneNumberForSignup: React.Dispatch<React.SetStateAction<string>>;
}
interface CertificaationPhoneProps {
  setIsUser: React.Dispatch<React.SetStateAction<string>>;
  setPhoneNumberForSignup: React.Dispatch<React.SetStateAction<string>>;
}
interface PhoneNumberInputProps {
  phoneNumber: string;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
}
// This Page Function Controller
export const CertificaationPhone = ({ setIsUser, setPhoneNumberForSignup }: CertificaationPhoneProps) => {
  const [ShowAuthCodeInput, setShowAuthCodeInput] = useState<boolean>(false);
  const [btnClicked, setBtnClicked] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <Container maxWidth="xs">
      <Stack spacing={2}>
        <PhoneNumberInput phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />
        <AuthCodeSendBtn showAuthCodeInput={ShowAuthCodeInput} phoneNumber={phoneNumber} setBtnClicked={setBtnClicked} setShowAuthCodeInput={setShowAuthCodeInput} />
        {
          ShowAuthCodeInput &&
          <AuthCodeInput sendAuthBtn={btnClicked} phoneNumber={phoneNumber} setIsUser={setIsUser} setPhoneNumberForSignup={setPhoneNumberForSignup} />
        }
      </Stack>
    </Container>
  );
};

const PhoneNumberInput = ({ phoneNumber, setPhoneNumber }: PhoneNumberInputProps) => {
  const [] = useState<string>("");
  const continents: MuiTelInputContinent[] = ["AS"];
  const excludedCountries: MuiTelInputCountry[] = [];
  // 일단 한국만 폰인증.

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

const AuthCodeInput = ({ sendAuthBtn, phoneNumber, setIsUser, setPhoneNumberForSignup }: AuthCodeInputProps) => {
  const [value, setValue] = useState('');
  const { timeLeft, formattedTimeLeft, setTimeLeft } = useCountdownTimer(0);
  // 한국 폰번호
  const koreanPhoneNumber = (phoneNumber.slice(3)).replaceAll(' ', '');

  useEffect(() => {
    setTimeLeft(180);
  }, [sendAuthBtn]);
  const handleChange = (newValue: string) => {
    setValue(newValue);
  }

  const handleComplete = async (completedValue: string) => {
    // setAuthCode(completedValue);
    const responseData = await validateAuthCode('phoneNum', koreanPhoneNumber, completedValue);
    console.log(responseData.response);
    if (responseData.response) {
      // fail
      const errorData = ErrorDefinition[responseData.response.data];
      alert(errorData.message);
      console.log("🚀 ~ file: certification-phone.tsx:116 ~ handleComplete ~ errorData", errorData)
    }
    else if (responseData.response === undefined) {
      // success
      setPhoneNumberForSignup(koreanPhoneNumber);
      setIsUser("notUser"); // Go To SignUp Page
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
}

const AuthCodeSendBtn = ({ showAuthCodeInput, phoneNumber, setBtnClicked, setShowAuthCodeInput }: AuthCodeSendBtnProps) => {
  const { timeLeft: reSendTimeLeft, formattedTimeLeft: formattedReSendTimeLeft, setTimeLeft: setReSendTimeLeft } = useCountdownTimer(0);
  const koreanPhoneNumber = (phoneNumber.slice(3)).replaceAll(' ', '');

  const handleAuthButtonClick = async () => {
    if (reSendTimeLeft === 0) {
      setBtnClicked((value) => !value);
      setShowAuthCodeInput(true);
      setReSendTimeLeft(30);
      await sendAuthCode('phoneNum', koreanPhoneNumber);
    }
  }

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
