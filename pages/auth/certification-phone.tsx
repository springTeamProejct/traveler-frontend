import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputAdornment,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useFormik } from "formik";
import {
  MuiTelInput,
  MuiTelInputContinent,
  MuiTelInputCountry,
  MuiTelInputInfo,
} from "mui-tel-input";
import React, { useEffect, useState } from "react";
import { MuiOtpInput } from 'mui-one-time-password-input'

interface InitBtnProps {
  setViewAuthSection: React.Dispatch<React.SetStateAction<boolean>>;
}
interface AuthSectionsProps {
  isView: boolean;
}
interface CountDownProps {
  secTime: number;
}
interface CertificaationPhoneProps {
  setIsUser: React.Dispatch<React.SetStateAction<boolean>>;
}
export const CertificaationPhone = ({ setIsUser }: CertificaationPhoneProps) => {
  // const formik = useFormik({

  // );
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

const InitButton = (prop: InitBtnProps) => {
  const [buttonStatus, setButtonStatus] = useState<string>("인증하기");

  return (
    <Button
      color="primary"
      fullWidth
      type="submit"
      variant="contained"
      onClick={() => {
        prop.setViewAuthSection(true);
        setButtonStatus("재전송");
      }}
    >
      {buttonStatus} {" "}
      {
        buttonStatus === "재전송" &&
        <CountDown secTime={29} />
      }
    </Button>
  );
};


const CountDown = (props: CountDownProps) => {
  const [time, setTime] = useState<number>();
  var secTime = props.secTime;

  useEffect(() => {
    const countDown = setInterval(() => {
      setTime(secTime);
      if (secTime < 0) {
        clearInterval(countDown);
      }
      --secTime;
    }, 1000);

    return () => clearInterval(countDown);
  }, []);

  return <>{time}</>;
};

// const CountDown = (props: CountDownProps) => {
//   const [time, setTime] = useState<number>(props.secTime);
//   var secTime = props.secTime;
//   useEffect(() => {
//     const countDown = setInterval(() => {
//       setTime(secTime);
//       if (secTime < 0) {
//         clearInterval(countDown);
//       }
//       --secTime;
//     }, 1000);

//     return () => clearInterval(countDown);
//   }, []);

//   return <>{time}</>;
// };