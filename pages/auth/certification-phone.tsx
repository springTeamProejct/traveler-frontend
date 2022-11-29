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
import React, { useEffect, useState } from "react";
interface InitBtnProps {
  setViewAuthSection: React.Dispatch<React.SetStateAction<boolean>>;
}
interface AuthSectionsProps {
  isView: boolean;
}
interface CountDownProps {
  secTime: number;
}
export const CertificaationPhone = () => {
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
      <AuthSection isView={viewAuthSection} />
      <InitButton setViewAuthSection={setViewAuthSection} />
    </Stack>
  );
};

const AuthSection = (props: AuthSectionsProps) => {
  return (
    <>
      {props.isView && (
        <FormControl variant="standard">
          <Input id="auth-input" />
          <a href="#" id="auth-count-down">
            재발급
            <CountDown secTime={30} />
          </a>
        </FormControl>
      )}
    </>
  );
};

const InitButton = (prop: InitBtnProps) => {
  return (
    <Button
      color="primary"
      fullWidth
      type="submit"
      variant="contained"
      onClick={() => prop.setViewAuthSection(true)}
    >
      인증하기
    </Button>
  );
};

const CountDown = (props: CountDownProps) => {
  const [time, setTime] = useState<number>(props.secTime);
  var secTime = props.secTime;
  useEffect(() => {
    const countDown = setInterval(() => {
      setTime(secTime);
      console.log(secTime);
      if (secTime < 0) {
        clearInterval(countDown);
      }
      --secTime;
    }, 1000);
    return () => clearInterval(countDown);
  }, []);

  return <>{time}</>;
};

const NumberInputCompleteButton = () => {
  return <></>;
};
