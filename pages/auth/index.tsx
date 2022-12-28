import { Container } from '@mui/system'
import React, { useState } from 'react'
import { CertificaationPhone } from './certification-phone';
import SignUp from './signup';

export const RegisterPageController = () => {
  const [authPage, setAuthPage] = useState('firstPage');

  if (authPage === 'firstPage') {
    return (
      <Container maxWidth="xs">
        <CertificaationPhone setIsUser={setAuthPage} />
      </Container>
    );
  }
  else if (authPage === 'notUser') {
    return (
      <Container maxWidth="sm">
        <SignUp />
      </Container>
    );
  }
  else if (authPage === 'isUser') {
    return (
      <Container maxWidth="xs" >
        <CertificaationPhone setIsUser={setAuthPage} />
      </Container >
    );
  }

}

export default RegisterPageController;