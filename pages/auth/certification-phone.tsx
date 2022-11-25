import { Button, FormControl, FormHelperText, Input, InputAdornment } from "@mui/material";
import { Stack } from "@mui/system";
import {
  MuiTelInput,
  MuiTelInputContinent,
  MuiTelInputCountry,
  MuiTelInputInfo,
} from "mui-tel-input";
import React from 'react'

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
      {viewAuthSection &&
        <FormControl variant="standard">
          <Input
            id="auth-input"
          />
          <FormHelperText id="auth-count-down">3:00</FormHelperText>
        </FormControl>
        }
      <Button
        color="primary"
        fullWidth
        type="submit"
        variant="contained"
        onClick={() => setViewAuthSection(true)}
      >
        인증하기
      </Button>
    </Stack>

  )
}

const CountDownButton = () => {

}

const NumberInputCompleteButton = () => {

}