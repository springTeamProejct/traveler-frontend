import React, { useState } from 'react'
import { CertificaationPhone } from './certification-phone';
import router from 'next/router';
import Signup from './signup';

// Page Controller
export default function AuthPageController() {
  const [authPage, setAuthPage] = useState('firstPage');
  const [phoneNumberForSignup, setPhoneNumberForSignup] = useState('No Phone Number');

  if (authPage === 'firstPage') {
    return <CertificaationPhone setIsUser={setAuthPage} setPhoneNumberForSignup={setPhoneNumberForSignup} />
  }
  else if (authPage === 'notUser') {
    return <Signup phoneNumber={phoneNumberForSignup} setIsUser={setAuthPage} />
  }
  else if (authPage === 'isUser') {
    router.push('/login');
  }
} 