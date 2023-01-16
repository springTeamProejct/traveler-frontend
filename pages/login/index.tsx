import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import {useRouter} from 'next/router'
import { login } from '../../apis/auth';
import { useAuthContext } from '../../context/AuthContext';
import * as Yup from 'yup';
import { useFormik } from "formik";


export default function Login() {
  const { setInitToken } = useAuthContext();
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
    onSubmit: values => {
      console.log(values);
      login(values).then(data => {
        setInitToken(data);
        router.push('/');
      });
    },
  });

  return(
    <div style={{
      display: 'flex',
      width: '100vw',
      height: '100vh',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Box
        style={{ width: '300px' }}
        component='form'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          '& > :not(style)': { m: 1, width: '25ch' }
        }}
        noValidate
        autoComplete='off'
        onSubmit={formik.handleSubmit}
      >
        <TextField
          style={{ width: '94%' }}
          id='outlined-basic'
          variant='outlined'
          label='email'
          name='email'
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.email && formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        / >
        <TextField
          style={{ width: '94%' }}
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
        / >
        <Button
          style={{ width: '94%' }}
          type='submit'
          variant='contained'
        >
          Login
        </Button>
      </Box>
    </div>
  )
}
