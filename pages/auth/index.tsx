import React, { useState } from 'react'
import { CertificaationPhone } from './certification-phone';
import { Signin } from './signin';
import { Signup } from './signup';
import router from 'next/router';

// Page Controller
export default function AuthPageController() {
  const [authPage, setAuthPage] = useState('firstPage');

  if (authPage === 'firstPage') {
    return <CertificaationPhone setIsUser={setAuthPage} />
  }
  else if (authPage === 'notUser') {
    return router.push('/auth/signup');
  }
  else if (authPage === 'isUser') {
    return router.push('/auth/signin');
  }
} 