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
interface InitBtnProps {
  setViewAuthSection: React.Dispatch<React.SetStateAction<boolean>>;
}
interface AuthSectionsProps {
  isView: boolean;
}
interface CountDownProps {
  setTimer: React.Dispatch<React.SetStateAction<number>>;
  start: boolean;
}
interface CertificaationPhoneProps {
  setIsUser: React.Dispatch<React.SetStateAction<boolean>>;
}
export const CertificaationPhone = ({ setIsUser }: CertificaationPhoneProps) => {
  const [phoneNumber, setPhoneNumber] = React.useState<string>("");
  const [viewAuthSection, setViewAuthSection] = React.useState<boolean>(false);
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
      <AuthButton setViewAuthSection={setViewAuthSection} />
      <AuthSection isView={viewAuthSection} />
    </Stack>
  );
};

const AuthSection = (props: AuthSectionsProps) => {
  const [value, setValue] = React.useState<string>('')
  const handleChange = (newValue: string) => {
    setValue(newValue)
  }
  const handleComplete = (finalValue: string) => {
    console.log("🚀 ~ file: certification-phone.tsx:67 ~ handleComplete ~ finalValue", finalValue)
  }

  return (
    <>
      {props.isView && (
        <FormControl variant="standard">
          <MuiOtpInput
            TextFieldsProps={{
              error: true,
            }}
            id="auth-input"
            value={value}
            onChange={handleChange}
            onComplete={handleComplete}
            length={6}
            validateChar={(character: string, index: number) => true}
          />
          <a href="#" id="auth-count-down">
          </a>
        </FormControl>
      )}
    </>
  );
};

const AuthButton = ({ setViewAuthSection }: InitBtnProps) => {
  const [buttonState, setButtonState] = useState(0);
  const { timeLeft, formattedTimeLeft, setTimeLeft } = useCountdownTimer(0);

  // 0: 처음만 가능한
  // 1: 재전송으로 변경
  const handleAuthButtonClick = () => {

    if (buttonState === 0) {
      setButtonState(1);
      setViewAuthSection(true);
      setTimeLeft(10);
    }
    else if (buttonState === 1) {
      setTimeLeft(10);
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
