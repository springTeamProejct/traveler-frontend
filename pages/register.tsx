import React, { useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import dayjs, { Dayjs } from "dayjs";
import {
  Button,
  Typography,
  Container,
  Grid,
  RadioGroup,
  Radio,
  FormLabel,
  FormControlLabel,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TextField from "@mui/material/TextField";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  MuiTelInput,
  MuiTelInputContinent,
  MuiTelInputCountry,
  MuiTelInputInfo,
} from "mui-tel-input";

const Register = () => {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs("2022-04-07"));
  // const [gender, setGender] = React.useState("Male");
  const [phone, setPhone] = React.useState<string>("");

  const handlePhoneNumberChange = (newPhone: string, info: MuiTelInputInfo) => {
    setPhone(newPhone);
  };
  // const continents: MuiTelInputContinent[] = ["AS"];
  const excludedCountries: MuiTelInputCountry[] = [];

  return (
    <Container maxWidth="sm">
      <Head>
        <title>회원가입 | Traveler</title>
      </Head>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <NextLink href="/" passHref>
            <Button startIcon={<ArrowBackIcon fontSize="small" />}>홈</Button>
          </NextLink>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" color="primary">
            환영합니다.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="별명"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={9}>
          <TextField
            id="outlined-basic"
            label="아이디(이메일)"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <Button
            color="primary"
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            sx={{ height: "100%", fontSize: "11px"}}
          >
            인증번호<br/>발송
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="비밀번호"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="비밀번호 확인"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              disableFuture
              label="생년월일"
              openTo="year"
              views={["year", "month", "day"]}
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6}>
          <FormLabel id="demo-radio-buttons-group-label">성별</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="Male"
            name="radio-buttons-group"
          >
            <FormControlLabel value="Male" control={<Radio />} label="남자" />
            <FormControlLabel value="Female" control={<Radio />} label="여자" />
          </RadioGroup>
        </Grid>
        <Grid item xs={12}>
          <MuiTelInput
            fullWidth
            defaultCountry="KR"
            value={phone}
            onChange={handlePhoneNumberChange}
            // continents={continents}
            excludedCountries={excludedCountries}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            color="primary"
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            회원가입
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
