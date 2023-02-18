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
  FormControl,
  FormHelperText,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TextField from "@mui/material/TextField";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useFormik } from "formik";
import { registerAuthCode, sendAuthCode, validateAuthCode } from "../../apis/auth/signup";
import { InputAndTimer } from "../../components/AuthCodeInput";
import { ErrorDefinition } from "../../utils/error";
interface SignUpProps {
  phoneNumber: string;
  setIsUser: React.Dispatch<React.SetStateAction<string>>;
}

export default function Signup({ phoneNumber, setIsUser }: SignUpProps) {
  const RegisterSchema = Yup.object().shape({
    nickName: Yup.string().min(2, '너무 짧아요.').max(50, '너무 길어요.').required('필수항목 이예요.'),
    email: Yup.string().email('이메일 형식으로 입력해주세요.').required('필수항목 이예요.'),
    password: Yup.string().required('필수항목 이예요.'),
    gender: Yup.string().required('필수항목 이예요.'),
    confirmPassword: Yup.string().when("password", {
      is: (val: string) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "비밀번호가 다릅니다."
      )
    }).required('필수할목 이에요.')
  });

  const formik = useFormik({
    initialValues: {
      email: 'hwanju1596@gmail.com',
      password: '!!tetetetadfa',
      confirmPassword: '',
      nickName: '이환주',
      birth: '',
      gender: "",
      phoneNum: phoneNumber,
    },
    validationSchema: RegisterSchema,
    onSubmit: (values, actions) => {
      if (isCertified) {
        console.log("🚀 ~ file: signup.tsx:55 ~ onSubmit: ~ actions", actions)
        actions.setSubmitting(false);
        const dateBirth = new Date(values.birth)
        values.birth = `${dateBirth.getFullYear()}${dateBirth.getMonth() + 1 < 10 ? `0${dateBirth.getMonth() + 1}` : dateBirth.getMonth() + 1}${dateBirth.getDate() < 10 ? `0${dateBirth.getDate()}` : dateBirth.getDate()}`; //YYYY-MM-DD
        const res = registerAuthCode(values).then((res) => {
          console.log("res", res);
        });
      }
      else {
        alert("이메일 인증을 진행해주세요.");
      }

    },
  });

  const [authStart, setAuthStart] = useState(false);
  const [showAuthSection, setShowAuthSection] = useState(false);
  const [isCertified, setIsCertified] = useState(false);

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
              disabled={isCertified}
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
              variant="contained"
              disabled={isCertified}
              onClick={() => {
                setAuthStart((authStart) => !authStart);
                setShowAuthSection(true);
                alert(`${formik.values.email}로 인증번호를 발송했습니다.`)
                sendAuthCode('email', formik.values.email);
              }}
              sx={{ height: "100%", fontSize: "11px" }}
            >
              인증
            </Button>
          </Grid>
          <Grid item xs={9} display={{ xs: showAuthSection ? "" : "none", lg: showAuthSection ? "" : "none" }}>
            <InputAndTimer timerStart={authStart} handleComplete={async (completedValue) => {
              const responseData = await validateAuthCode(formik.values.email, completedValue);
              if (responseData.response) {
                // fail
                const errorData = ErrorDefinition[responseData.response.data];
                alert(errorData.message);
                setIsCertified(false);
              }
              else if (responseData.response === undefined) {
                // success
                alert("인증에 성공했습니다.");
                setShowAuthSection(false);
                setIsCertified(true);
              }
            }} />
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
              name="confirmPassword"
              label="비밀번호 확인"
              variant="outlined"
              // confirmPassword
              error={Boolean(formik.touched.confirmPassword && formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
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
                onChange={(value) => {
                  value !== null ? formik.setFieldValue('birth', Date.parse(value.toString())) : console.log('null');
                }}
                value={formik.values.birth}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <FormControl error={Boolean(formik.errors.gender)} variant="standard">
              <FormLabel id="demo-radio-buttons-group-label">성별</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                onChange={formik.handleChange}
                value={formik.values.gender}
              >
                <FormControlLabel value="MALE" name="gender" control={<Radio />} label="남자" />
                <FormControlLabel value="FEMALE" name="gender" control={<Radio />} label="여자" />
                <FormHelperText>{formik.errors.gender}</FormHelperText>
              </RadioGroup>
            </FormControl>

          </Grid>
          <Grid item xs={12}>
            <Button
              color="primary"
              // disabled={formik.isSubmitting}
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
