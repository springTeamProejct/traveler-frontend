import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputAdornment,
} from "@mui/material";
import { Stack } from "@mui/system";
import {
  MuiTelInput,
  MuiTelInputContinent,
  MuiTelInputCountry,
  MuiTelInputInfo,
} from "mui-tel-input";
import React, { useEffect, useRef, useState } from "react";
import { MuiOtpInput } from 'mui-one-time-password-input';
import { useCountdownTimer } from "../../hooks/useCountdownTimer"
import { DefaultValue } from "recoil";
interface InitBtnProps {
  setViewAuthInput: React.Dispatch<React.SetStateAction<boolean>>;
}
interface AuthInputProps {
  isView: boolean;
  setIsUser: React.Dispatch<React.SetStateAction<string>>;
}
interface CertificaationPhoneProps {
  setIsUser: React.Dispatch<React.SetStateAction<string>>;
}

export const CertificaationPhone = ({ setIsUser }: CertificaationPhoneProps) => {
  const [phoneNumber, setPhoneNumber] = React.useState<string>("");
  const [viewAuthInput, setViewAuthInput] = React.useState<boolean>(false);
  const handlePhoneNumberChange = (newPhone: string, info: MuiTelInputInfo) => {
    setPhoneNumber(newPhone);
  };
  // const continents: MuiTelInputContinent[] = ["AS"];
  const excludedCountries: MuiTelInputCountry[] = [];
  return (
    <Stack spacing={2}>
      <MuiTelInput
        fullWidth
        defaultCountry="KR"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        // continents={continents}
        excludedCountries={excludedCountries}
      />
      <AuthButton setViewAuthInput={setViewAuthInput} />
      <AuthInput isView={viewAuthInput} setIsUser={setIsUser} />
    </Stack>
  );
};

const AuthInput = ({ isView, setIsUser }: AuthInputProps) => {
  const [value, setValue] = useState<string>('');
  const handleChange = (newValue: string) => {
    setValue(newValue);
  }
  const handleComplete = (finalValue: string) => {
    console.log("🚀 ~ file: certification-phone.tsx:67 ~ handleComplete ~ finalValue", finalValue);
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
      {isView && (
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
          <a href="#" id="auth-count-down">fe
          </a>
        </FormControl>
      )}
    </>
  );
};

const AuthButton = ({ setViewAuthInput }: InitBtnProps) => {
  const [buttonState, setButtonState] = useState(0);
  const { timeLeft, formattedTimeLeft, setTimeLeft } = useCountdownTimer(0);

  const handleAuthButtonClick = () => {
    if (buttonState === 0) {
      setButtonState(1);
      setViewAuthInput(true);
      setTimeLeft(30);
    }
    else if (buttonState === 1) {
      setTimeLeft(30);
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
        buttonState > 0 // 0: 인증번호전송 >1: 재전송
          ? <>재전송 {formattedTimeLeft} </>
          : <>인증번호전송</>
      }
    </Button >
  );
};
