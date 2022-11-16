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
  FormControlLabel,
  Radio,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TextField from "@mui/material/TextField";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const Register = () => {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs("2022-04-07"));
  const [gender, setGender] = React.useState('Female');
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
            label="이메일"
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
            sx={{ height: "100%" }}
          >
            인증
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
          <RadioGroup
            row
            aria-labelledby="segmented-controls-example"
            defaultValue="female"
            name="gender"
            value={gender}
            onChange={(event) => setGender(event.target.value)}
          >
         {['female', 'male'].map((item) => (  
            <Radio
              key={item}
              color="primary"
              value={item}
              label={item}
              variant="plain"
              sx={{
                px: 2,
                alignItems: 'center',
              }}
              componentsProps={{
                action: ({ checked}) => ({
                  sx: {
                    ...(checked && {
                      bgcolor: 'background.surface',
                      boxShadow: 'md',
                      '&:hover': {
                        bgcolor: 'background.surface',
                      },
                    }),
                  },
                }),
              }}
            />
          ))
          }
          </RadioGroup>
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
