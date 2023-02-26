import { Button, Container, Divider, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useRouter } from 'next/router'
import { fetchProfile, login } from '../../apis/auth';
import { useAuthContext } from '../../context/AuthContext';
import * as Yup from 'yup';
import { useFormik } from "formik";
import { NaverAuthButton, GoogleAuthButton, KakaoAuthButton } from '../../components/oauth';
import Image from 'next/image';
import Logo from '/public/tempIcon.png'

export default function Login() {
  const { setInitToken, setProfile } = useAuthContext();
  const router = useRouter();

  const RegisterSchema = Yup.object().shape({
    email: Yup.string().email('이메일 형식으로 입력해주세요.').required('필수항목 이예요.'),
    password: Yup.string().min(8, '너무 짧아요.').required('필수항목 이예요.'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      console.log(values);
      const loginResponseDto = await login(values);
      setInitToken(loginResponseDto);
      // 로그인 직후 프로필 정보를 가져오는 부분 백엔드 API가 완성되면 풀자
      const profile = await fetchProfile(loginResponseDto.accessToken);
      setProfile(profile);
      router.push('/');
    },
  });

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          textAlign: 'center',
        }}>
        <Image src={Logo}
          alt='Traveler'
          width={200}
          height={200}
        />
      </Box>

      <Box
        component='form'
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
        noValidate
        autoComplete='off'
        onSubmit={formik.handleSubmit}
      >
        <TextField
          id='outlined-basic'
          variant='outlined'
          label='email'
          name='email'
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.email && formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          id='outlined-basic'
          variant='outlined'
          label='password'
          name='password'
          type='password'
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.password && formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button
          type='submit'
          variant='contained'
        >
          Login
        </Button>
        <Divider> <br />Or<br /><br /></Divider>
        <NaverAuthButton />
        <GoogleAuthButton />
        <KakaoAuthButton />
      </Box>
    </Container>
  )
}
