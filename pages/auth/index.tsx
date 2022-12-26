import { Container } from '@mui/system'
import React, { useState } from 'react'
import { CertificaationPhone } from './certification-phone';
import { CountdownTimer } from './temp';

export const RegisterPageController = () => {
  const [isUser, setIsUser] = useState<boolean>(true);

  return (
    <Container maxWidth="xs">
      {
        isUser
          ? <CountdownTimer seconds={60} /> //<CertificaationPhone setIsUser={setIsUser} />
          : <p> Login Page </p>
      }
      <CertificaationPhone setIsUser={setIsUser} />
    </Container>
  )
}

export default RegisterPageController;