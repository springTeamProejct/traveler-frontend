import React, { useState } from 'react'
import { CertificaationPhone } from './certification-phone';
import { Signin } from './signin';
import { Signup } from './signup';

export default function AuthPageController() {
  const [authPage, setAuthPage] = useState('firstPage');

  if (authPage === 'firstPage') {
    return <CertificaationPhone setIsUser={setAuthPage} />
  }
  else if (authPage === 'notUser') {
    return <Signup />
  }
  else if (authPage === 'isUser') {
    return <Signin />
  }
} 