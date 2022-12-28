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
          ? <CertificaationPhone setIsUser={setIsUser} />
          : <p> Login Page </p>
      }

    </Container>
  )
}

export default RegisterPageController;