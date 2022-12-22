import React, { useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import * as Yup from 'yup';
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
import { useFormik } from "formik";

const SignUp = () => {
  const [birth, setBirth] = React.useState<Dayjs | null>(dayjs("2022-04-07"));
  const [authEmailInputView, setEmailInputView] = React.useState<boolean>(false);

  const RegisterSchema = Yup.object().shape({
    nickName: Yup.string().min(2, '너무 짧아요.').max(50, '너무 길어요.').required('필수항목 입니다.'),
    email: Yup.string().email('이메일 형식으로 입력해주세요.').required('필수항목 입니다.'),
    password: Yup.string().required('필수항목 입니다.'),
  });

  const formik = useFormik({
    initialValues: {
      nickName: '',
      email: '',
      password: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
      console.log(JSON.stringify(values, null, 2));
    },
  });


  return (
    <Container maxWidth="sm">
      <Head>
        <title>회원가입 | Traveler</title>
      </Head>
      <form onSubmit={formik.handleSubmit}>
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
              name="nickName"
              value={formik.values.nickName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.nickName && formik.errors.nickName)}
              helperText={formik.touched.nickName && formik.errors.nickName}
              fullWidth
            />
          </Grid>
          <Grid item xs={9}>
            <TextField
              id="outlined-basic"
              label="아이디(이메일)"
              variant="outlined"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              helperText={formik.touched.email && formik.errors.email}
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              color="primary"
              fullWidth
              type="submit"
              variant="contained"
              // onClick={set}
              sx={{ height: "100%", fontSize: "11px" }}
            >
              인증번호
              <br />
              발송
            </Button>
          </Grid>
          <Grid item xs={9} display={{ xs: "none", lg: "none" }}>
            <TextField
              id="outlined-basic"
              label="인증번호 입력"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={3} display={{ xs: "none", lg: "none" }}>
            <Button
              color="primary"
              fullWidth
              type="submit"
              variant="contained"
              // onClick={set}
              sx={{ height: "100%" }}
            >
              확인
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              type="password"
              label="비밀번호"
              variant="outlined"
              name="password"
              fullWidth
              error={Boolean(formik.touched.password && formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              type="password"
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
                value={birth}
                onChange={(newValue) => {
                  setBirth(newValue);
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
              name="radio-buttons-group"
            >
              <FormControlLabel value="Male" control={<Radio />} label="남자" />
              <FormControlLabel value="Female" control={<Radio />} label="여자" />
            </RadioGroup>
          </Grid>

          <Grid item xs={12}>
            <Button
              color="primary"
              disabled={formik.isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              회원가입
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container >
  );
};

export default SignUp;
