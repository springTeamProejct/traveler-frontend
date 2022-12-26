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
      <InitButton setViewAuthSection={setViewAuthSection} />
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

const InitButton = ({ setViewAuthSection }: InitBtnProps) => {
  const [buttonStatus, setButtonStatus] = useState<boolean>(false);
  const [seconds, setSeconds] = useState(60);
  const { timeLeft, formattedTimeLeft } = useCountdownTimer(seconds);

  return (
    <Button
      color="primary"
      fullWidth
      type="submit"
      variant="contained"
      disabled={seconds < 0 ? true : false}
      onClick={() => {
        console.log("🚀 ~ file: certification-phone.tsx:115 ~ InitButton ~ onClick");
        setViewAuthSection(true);
        setButtonStatus(true);
        setSeconds(60);
      }}
    >
      {
        buttonStatus
          ? <>재전송 {formattedTimeLeft} {" | "}  </>
          : <>인증번호전송 {timeLeft} </>
      }
    </Button>
  );
};
